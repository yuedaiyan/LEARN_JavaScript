// 导入订单清单
import { orders } from "../data/orders.js";
// 导入时间模块
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
// 导入money从美分转换为美元的计算函数
import { formatCurrency } from "../scripts/utils/money.js";
// 导入商品清单,查找完整商品信息函数
import { getProductFromProducts, loadProductsFetch } from "../data/products.js";
// 导入购物车列表
import { cart } from "../data/cart-class.js";

console.log(orders);

// 处理页眉购物车数量标签
document.querySelector(".js-cart-quantity").innerHTML = cart.calculateCartQuantity(cart);

// 整个页面的渲染函数
async function renderAllOrders() {
    await loadProductsFetch();
    orders.forEach((order) => {
        renderAnOrder(order);
    });
    // 添加监听器
    buyAgain();
}

// 一笔订单 渲染函数
function renderAnOrder(order) {
    let ordersGridHTML = "";
    ordersGridHTML += `
<!-- order start -->
                <div class="order-container js-order-container">
                    
                    <div class="order-header">
                        <div class="order-header-left-section">
                            <div class="order-date">
                                <div class="order-header-label">Order Placed:</div>
                                <div>${dayjs(order.time).format("MMMM YY")}</div>
                            </div>
                            <div class="order-total">
                                <div class="order-header-label">Total:</div>
                                <div>$ ${formatCurrency(order.totalCostCents)}</div>
                            </div>
                        </div>

                        <div class="order-header-right-section">
                            <div class="order-header-label">Order ID:</div>
                            <div>${order.id}</div>
                        </div>
                    </div>

<!-- order content section start -->
                    <div class="order-details-grid js-order-details-grid">
                        ${renderAllProduct(order)}
                    </div>
<!-- order content section end -->

                </div>
<!-- orders end -->
    
    `;
    document.querySelector(".js-orders-grid").innerHTML += ordersGridHTML;
}

function renderAllProduct(order) {
    let allProducts = "";
    // 每一笔订单内部,渲染商品详情
    order.products.forEach((product) => {
        allProducts += renderAnProduct(order,product);
    });
    return allProducts;
}

// 订单详细信息函数(订单中的一个商品)
function renderAnProduct(order,product) {
    let oneProductHTML = "";
    const matchingProduct = getProductFromProducts(product.productId);
    console.log('product: ',product);

    // 处理 Track package 按钮的url参数传递 → 传两个参数
    const params = new URLSearchParams();
    params.append("orderId", order.id);
    params.append("productId", product.productId);

    oneProductHTML += `
<!-- one order start -->
                        <div class="product-image-container">
                            <img src="${matchingProduct.image}" />
                        </div>

                        <div class="product-details">
                            <div class="product-name">${matchingProduct.name}</div>
                            <div class="product-delivery-date">Arriving on: ${dayjs(product.estimatedDeliveryTime).format("MMMM D")}</div>
                            <div class="product-quantity">Quantity: ${product.quantity}</div>
<!-- buy it again button -->
                            <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${product.productId}">
<!-- buy it again button -->
                                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                                <span class="buy-again-message">Buy it again</span>
                            </button>
                        </div>
                        <div class="product-actions">

<!-- go to tracking.html page -->
                            <a href="tracking.html?${params.toString()}">
<!-- go to tracking.html page -->

                                <button class="track-package-button button-secondary">Track package</button>
                            </a>
                        </div>
<!-- one order end -->
    `;
    return oneProductHTML;
}

// 执行 渲染整个页面
renderAllOrders();

// 点击 Buy it again 按钮之后,将一份商品加入购物车
function buyAgain() {
    document.querySelectorAll(".js-buy-again-button").forEach((button) => {
        button.addEventListener("click", () => {
            // add to cart
            const { productId } = button.dataset;
            cart.addToCart(productId, 1);
            // 刷新屏幕:修改屏幕右上角购物车商品数量,处理页眉购物车数量标签
            document.querySelector(".js-cart-quantity").innerHTML = cart.calculateCartQuantity(cart);
        });
    });
}
