// 导入订单清单
import { orders } from "../data/orders.js";
// 导入时间模块
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
// 导入商品清单,查找完整商品信息函数
import { getProductFromProducts, loadProductsFetch } from "../data/products.js";

// console.log(orders);

// 获取本页product id
const url = new URL(window.location.href);
const orderId = url.searchParams.get("orderId");
const productId = url.searchParams.get("productId");

// 获取本页面订单中的商品
const orderOfPage = getOrderFromOrders(orderId);
const productOfPage = getTheProductInOrder(orderOfPage, productId);

// 格式化时间
const estimateDateFormat = dayjs(productOfPage.estimatedDeliveryTime).format("dddd, MMM D");

// 获取商品基本信息
await loadProductsFetch();
const matchingProduct = getProductFromProducts(productId);

// 渲染页面核心区
async function renderMain() {
    let mainHTML = `
            <div class="order-tracking">
                <a class="back-to-orders-link link-primary" href="orders.html"> View all orders </a>

                <div class="delivery-date">Arriving on ${estimateDateFormat}</div>

                <div class="product-info">${matchingProduct.name}</div>

                <div class="product-info">Quantity: ${productOfPage.quantity}</div>

                <img class="product-image" src="${matchingProduct.image}" />

                <div class="progress-labels-container">
                    <div class="progress-label">Preparing</div>
                    <div class="progress-label current-status">Shipped</div>
                    <div class="progress-label">Delivered</div>
                </div>

                <div class="progress-bar-container">
                    <div class="progress-bar"></div>
                </div>
            </div>
    `;
    document.querySelector(".js-main").innerHTML = mainHTML;
}

// 通过 order id 获得本页面的 order 对象
function getOrderFromOrders(orderId) {
    return orders.find((order) => {
        return order.id === orderId;
    });
}

// 通过 本页面的order对象 和 本页面的productId 获得 本页面的product对象
function getTheProductInOrder(orderOfPage, productId) {
    return orderOfPage.products.find((product) => {
        return product.productId === productId;
    });
}

// 执行 渲染页面核心区
renderMain();
