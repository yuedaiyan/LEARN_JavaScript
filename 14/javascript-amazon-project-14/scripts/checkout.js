// 导入商品清单
import { products } from "../data/products.js";
// 导入购物车列表
import { cart, removeFromCart } from "../data/cart.js";
// 导入money从美分转换为美元的计算函数
import { formatCurrency } from "./utils/money.js";
// 导入购物车内商品总数量计算
import { calculateCartQuantity } from "../data/cart.js";

let cartSummaryHTML = "";
cart.forEach((cartItem) => {
    let matchingProduct;
    // 根据 cartItem 查找出完整项目 → 将完整条目存入matchingProduct(HTML将使用matchingProduct生成DOM树)
    products.forEach((product) => {
        if (product.id === cartItem.productId) {
            matchingProduct = product;
        }
    });

    // 生成 HTML
    cartSummaryHTML += `
          <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link"  data-product-id="${matchingProduct.id}">
                    Update
                  </span>
<!--  -->
                  <input class="quantity-input">
                  <span class="save-quantity-link link-primary">
                    Save
               </span>
<!--  -->
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                        Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                        Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


`;
});
// 打印完整购物车DOM树
// console.log(cartSummaryHTML);

// 将生成的HTMl拼接到主HTML DOM树上
document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

// 监听 update 按钮 → 实现按钮的 update 功能
document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
        // console.log(link.dataset.productId);
        const productId = link.dataset.productId;
        // 获得点击update时对应的完整容器
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        // 点击时,加入css: is-editing-quantity
        container.classList.add("is-editing-quantity");
        // 定位到当前容器内的 input 和 save 元素 → 使其显示
        // input:

        // const cc = document.querySelector(`.js-cart-item-container-${productId} .quantity-input`);
        // console.log(cc);
           document.querySelector(`.js-cart-item-container-${productId} .quantity-input`).classList.add('element-active');
        // save:
           document.querySelector(`.js-cart-item-container-${productId} .save-quantity-link`).classList.add('element-active');
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
        document.querySelector(".js-return-to-home-link").innerHTML = calculateCartQuantity(cart);
    });
});

// 更新页面最上方的购物车内商品总数清单
document.querySelector(".js-return-to-home-link").innerHTML = calculateCartQuantity(cart);
