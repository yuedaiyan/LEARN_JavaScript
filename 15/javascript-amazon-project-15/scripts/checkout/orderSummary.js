// 导入商品清单,查找完整商品信息函数
import { getProductFromProducts } from "../../data/products.js";
// 导入购物车列表
import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
// 导入money从美分转换为美元的计算函数
import { formatCurrency } from "../utils/money.js";
// 导入购物车内商品总数量计算
import { calculateCartQuantity, updateQuantity, getProductFromCart } from "../../data/cart.js";
// 导入时间模块
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
// 导入三档快递时间,档位信息查找函数
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
// 导入: 渲染右侧总金额计算函数
import { renderPaymentSummary } from "./paymentSummary.js";

// 全局变量:最后一次鼠标的Id,指向最后交互Id(主要功能是处理键盘enter确认save的效果)
let focusId;

// 全局变量:今天的时间
const today = dayjs();

export function renderOrderSummary() {
    let cartSummaryHTML = "";
    cart.forEach((cartItem) => {
        // 根据 cartItem 查找出完整项目 → 将完整条目存入matchingProduct(HTML将使用matchingProduct生成DOM树)
        const matchingProduct = getProductFromProducts(cartItem.productId);

        // 打印完整的matchingProduct条目
        // console.log("matchingProduct:",matchingProduct);

        // 计算真实的delivery date
        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);
        const deliveryDate = today.add(deliveryOption.deliveryDays, "day");
        const dateString = deliveryDate.format("dddd, MMMM D");

        // 生成 HTML
        cartSummaryHTML += `
          <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
<!-- 快递抵达时间部分 -->
              Delivery date: ${dateString}
<!-s 快递抵达时间部分 -->
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link"  data-product-id="${matchingProduct.id}">
                    Update
                  </span>
<!-- 修改商品数量部分 -->
                  <input class="quantity-input js-quantity-input"  name="quantity">
                  <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">
                    Save
               </span>
<!-- 修改商品数量部分 -->
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

<!-- 选择快递时间部分 -->
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
<!-- 选择快递时间部分 -->

<!-- 自动生成条目: -->
    ${deliveryOptionsHTML(matchingProduct, cartItem)}
<!-- 自动生成条目: -->
              </div>
            </div>
          </div>
        `;
    });
    // 打印完整购物车DOM树
    // console.log('cart's DOM: ',cartSummaryHTML);

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = "";
        deliveryOptions.forEach((deliveryOption) => {
            const deliveryDate = today.add(deliveryOption.deliveryDays, "day");
            // 最终生成最后可以显示在屏幕上的时间字符串,并且此字符串是动态的
            // 效果类似:Tuesday, June 21
            const dateString = deliveryDate.format("dddd, MMMM D");
            const priceSting = deliveryOption.priceCents === 0 ? "FREE" : `$${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `
        <!-- 一个条目,依靠forEach()来确定顺序,不过就三种可能: -->
        <div class="delivery-option js-delivery-option" data-product-id=${matchingProduct.id} data-delivery-option-id=${deliveryOption.id}>
                <input type="radio" ${isChecked ? "checked" : ""} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceSting} Shipping
                </div>
            </div>
        </div>
        `;
        });
        return html;
    }

    // 将生成的HTMl拼接到主HTML DOM树上
    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

    // 更新页面最上方的购物车内商品总数清单
    refreshReturnToHomeLink();

    // 监听 update 按钮 → 实现按钮的 update 功能
    document.querySelectorAll(".js-update-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            // 定位到当前容器内的 input 和 save 元素 → 使其显示
            // input 显示
            document.querySelector(`.js-cart-item-container-${productId} .js-quantity-input`).classList.add("is-editing-quantity");
            // save 显示
            document.querySelector(`.js-cart-item-container-${productId} .js-save-quantity-link`).classList.remove("save-quantity-link");
            // update 消失
            document.querySelector(`.js-cart-item-container-${productId} .js-update-link`).classList.add("save-quantity-link");
            // 将当前的焦点 id 添加到 focusId 列表中
            focusId = productId;
        });
    });

    // 监听 save 按钮 → 点击后消失 input + save, 同时显示 update
    document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
        link.addEventListener("click", () => {
            // 获取当前容器 id
            const productId = link.dataset.productId;
            // 获取 input 元素
            const inputEl = document.querySelector(`.js-cart-item-container-${productId} .js-quantity-input`);
            // 获取 save 元素
            const saveEl = document.querySelector(`.js-cart-item-container-${productId} .js-save-quantity-link`);
            // 获取 update 元素
            const updateEl = document.querySelector(`.js-cart-item-container-${productId} .js-update-link`);

            // 核心逻辑: 更新 quantity
            // 获取输入的值
            const inputNumber = Number(inputEl.value);
            // 检查输入的值是否是符合标准
            if (0 < inputNumber && inputNumber <= 100) {
                // 输入合法
                // 更新输入的值到 cart 中
                updateQuantity(productId, inputNumber);
                // 刷新容器内的 quantity
                // document.querySelector(`.js-cart-item-container-${productId} .js-quantity-label`).innerHTML = getProductFromCart(productId).quantity;
                // cart字典已经改变 → 重新渲染左侧购物车详情部分
                renderOrderSummary();
                // 刷新页面面正上方渲染
                refreshReturnToHomeLink();

                // 移除fucusId列表中的id,表示当前容器已经被关闭
                focusId = null;
            } else {
                // 输入不合法
                // 弹出错误
                alert("输入不合法,合法范围:(0,100]");
            }
            // input 消失
            inputEl.classList.remove("is-editing-quantity");
            // save 消失
            saveEl.classList.add("save-quantity-link");
            // update 显示
            updateEl.classList.remove("save-quantity-link");
            // 执行: 渲染右侧总金额计算函数
            renderPaymentSummary();
        });
    });

    // 监听 delete 按钮 → 删除按钮的点击删除功能
    document.querySelectorAll(".js-delete-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            // 更新页面最上方的购物车内商品总数清单
            refreshReturnToHomeLink();
            // cart字典已经改变 → 重新渲染左侧购物车详情部分
            renderOrderSummary();
            // 执行: 渲染右侧总金额计算函数
            renderPaymentSummary();
        });
    });

    // 监听 enter 按键 → 实现 save 功能
    document.addEventListener("keyup", (keyUp) => {
        if (keyUp.key === "Enter") {
            document.querySelector(`.js-cart-item-container-${focusId} .js-save-quantity-link`).click();
        }
    });

    // 更新页面上方购物车函数
    function refreshReturnToHomeLink() {
        document.querySelector(".js-return-to-home-link").innerHTML = `${calculateCartQuantity(cart)}  items`;
    }

    // 修改: 寄送时间
    document.querySelectorAll(".js-delivery-option").forEach((element) => {
        element.addEventListener("click", () => {
            const { productId, deliveryOptionId } = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            // cart字典已经改变 → 重新渲染左侧购物车详情部分
            renderOrderSummary();
            // 执行: 渲染右侧总金额计算函数
            renderPaymentSummary();
        });
    });
}
