// 导入商品清单
import { products } from "../data/products.js";
// 导入购物车列表
import { cart, addToCart } from "../data/cart.js";
// 导入money从美分转换为美元的计算函数
import { formatCurrency } from "./utils/money.js";
// 导入购物车内商品总数计算函数
import { calculateCartQuantity } from "../data/cart.js";

// 初始化购物车列表
let productsHTML = "";
// 初始化pressId(用户记录显示的绿色icon Id)
const pressId = {};

// 依据js文件:data/product.js中的list,逐条生成HTML
products.forEach((product) => {
    productsHTML += `
                   <div class="product-container">
                    <div class="product-image-container">
                        <img class="product-image" src="${product.image}" />
                    </div>

                    <div class="product-name limit-text-to-2-lines">${product.name}</div>

                    <div class="product-rating-container">
                        <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png" />
                        <div class="product-rating-count link-primary">${product.rating.count}</div>
                    </div>

                    <div class="product-price">${formatCurrency(product.priceCents)}</div>

                    <div class="product-quantity-container ">
                        <select class="js-quantity-selector-${product.id}">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>

                    <div class="product-spacer"></div>

                    <div class="added-to-cart js-added-to-cart-${product.id}">
                        <img src="images/icons/checkmark.png" />
                        Added
                    </div>

                    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                </div> 
    `;
});

// console 打印页面中所有商品条目的HTML
// console.log(productsHTML);

// 将生成的商品条目HTML,加入到.js-products-grid中,以供渲染
document.querySelector(".js-products-grid").innerHTML = productsHTML;

// 初始化购物车内商品数量
let cartQuantity = 0;
// 使用实际的cart数据,更新购物车数量
cartQuantity = calculateCartQuantity(cart);
// 刷新屏幕
document.querySelector(".js-cart-quantity").innerHTML = cartQuantity||'';

// Add 绿色提示
function showAddedToCartIcon(productId) {
    // 提前取消上一轮遗留的显示效果(如果显示效果存在的话(即便不存在,setTimeOut也不会报错))
    clearTimeout(pressId[productId]);
    // 点击 Add 按钮之后,上面出现绿色的提示
    const addedToCartEl = document.querySelector(`.js-added-to-cart-${productId}`);
    addedToCartEl.classList.add("added-to-cart-pressed");
    pressId[productId] = setTimeout(() => {
        addedToCartEl.classList.remove("added-to-cart-pressed");
        delete pressId[productId];
    }, 1500);
}

// 给每个按钮添加监听器 → 添加到购物车列表
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        const { productId } = button.dataset;
        addToCart(productId);

        // 刷新屏幕:修改屏幕右上角购物车商品数量
        // 处理0的问题
        document.querySelector(".js-cart-quantity").innerHTML = calculateCartQuantity(cart)||'';

        showAddedToCartIcon(productId);
    });
});
