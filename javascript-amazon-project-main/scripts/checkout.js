// 导入商品清单
import { products } from "../data/products.js";
// 导入购物车列表
import { cart, removeFromCart } from "../data/cart.js";
// 导入money从美分转换为美元的计算函数
import { formatCurrency } from "./utils/money.js";
// 导入购物车内商品总数量计算
import { calculateCartQuantity, updateQuantity, getProduct } from "../data/cart.js";
// 导入时间模块
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
// 导入三个时间选项
import { deliveryOptions } from "../data/deliveryOptions.js";

// 维护一个全局Id,指向最后交互Id
// (主要功能是处理键盘enter确认save的效果)
let focusId;

let cartSummaryHTML = "";
cart.forEach((cartItem) => {
    let matchingProduct;
    // 根据 cartItem 查找出完整项目 → 将完整条目存入matchingProduct(HTML将使用matchingProduct生成DOM树)
    products.forEach((product) => {
        if (product.id === cartItem.productId) {
            matchingProduct = product;
        }
    });

    // 打印完整的matchingProduct条目
    // console.log("matchingProduct:",matchingProduct);

    // 计算真实的delivery date
    const today = dayjs();
    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });
    const deliveryDate = today.add(deliveryOption.deliveryDays, "day");
    const dateString = deliveryDate.format("dddd, MMMM D");

    // 生成 HTML
    cartSummaryHTML += `
          <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
<!--  -->
              Delivery date: ${dateString}
<!--  -->
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
<!--  -->
                  <input class="quantity-input js-quantity-input">
                  <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">
                    Save
               </span>
<!--  -->
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

<!-- 自动生成条目: -->
    ${deliveryOptionsHTML(matchingProduct, cartItem)}


              </div>
            </div>
          </div>


`;
});
// 打印完整购物车DOM树

// console.log('cart's DOM: ',cartSummaryHTML);

function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    const today = dayjs();
    deliveryOptions.forEach((deliveryOption) => {
        const deliveryDate = today.add(deliveryOption.deliveryDays, "day");
        // 最终生成最后可以显示在屏幕上的时间字符串,并且此字符串是动态的
        // 效果类似:Tuesday, June 21
        const dateString = deliveryDate.format("dddd, MMMM D");
        const priceSting = deliveryOption.priceCents === 0 ? "FREE" : `$${formatCurrency(deliveryOption.priceCents)} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        // console.log(isChecked);

        html += `
        <!-- 一个条目,依靠forEach()来确定顺序,不过就三种可能: -->
        <div class="delivery-option">
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

// 监听 update 按钮 → 实现按钮的 update 功能
document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
        // console.log(link.dataset.productId);
        const productId = link.dataset.productId;
        // 获得点击update时对应的完整容器
        // const container = document.querySelector(`.js-cart-item-container-${productId}`);
        // 点击时,加入css: is-editing-quantity
        // container.classList.add("is-editing-quantity");
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
            document.querySelector(`.js-cart-item-container-${productId} .js-quantity-label`).innerHTML = getProduct(productId).quantity;
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
    });
});

// 监听 delete 按钮 → 删除按钮的点击删除功能
document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        // 更新页面最上方的购物车内商品总数清单
        refreshReturnToHomeLink();
    });
});

// 监听 enter 按键 → 实现 save 功能
document.addEventListener("keyup", (keyUp) => {
    if (keyUp.key === "Enter") {
        document.querySelector(`.js-cart-item-container-${focusId} .js-save-quantity-link`).click();
    }
});

// 更新页面最上方的购物车内商品总数清单
refreshReturnToHomeLink();

// 更新页面上方购物车函数
function refreshReturnToHomeLink() {
    document.querySelector(".js-return-to-home-link").innerHTML = `${calculateCartQuantity(cart)}  items`;
}

console.log(cart);
