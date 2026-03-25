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

console.log("order of the page(orderOfPage): ", orderOfPage);
console.log("product of the page(productOfPage):", productOfPage);
console.log("product information(mathcingProduct): ", matchingProduct);

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
                    <div class="progress-label js-progress-label">Preparing</div>
                    <div class="progress-label js-progress-label">Shipped</div>
                    <div class="progress-label js-progress-label">Delivered</div>
                </div>

<!-- 进度条相关 -->
                <div class="progress-bar-container">
                    <div class="progress-bar js-progress-bar"></div>
                </div>
<!-- 进度条相关 -->

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

function changeCurrentLabel(index) {
    // 函数 通过进度条进度修改"Preparing Shipped Delivered"的高亮状态
    const labels = document.querySelectorAll(".js-progress-label");
    labels.forEach((label) => label.classList.remove("current-status"));
    labels[index].classList.add("current-status");
}

// 计算商品送达百分比
function calculateDeliveryPercent() {
    // 获得百分比
    const currentTime = dayjs();
    console.log("current time: ", currentTime);
    const orderTime = dayjs(orderOfPage.orderTime);
    console.log("order time: ", orderTime);
    const deliveryTime = dayjs(productOfPage.estimatedDeliveryTime);
    console.log("delivery time: ", deliveryTime);
    const deliveryPercent = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;
    console.log(deliveryPercent);

    // 通过百分比修改进度条进度
    const barEl = document.querySelector(".js-progress-bar");

    barEl.style.width = deliveryPercent + "%";
    console.log(barEl.style.width);

    // 通过进度条进度修改"Preparing Shipped Delivered"的高亮状态
    // Set the correct status above the progress bar to green (0% - 49% = Preparing, 50% - 99% = Shipped, 100+% = Delivered).
    if (0 < deliveryPercent &&deliveryPercent<= 49) {
        console.log("run 0");
        changeCurrentLabel(0);
    } else if (49 < deliveryPercent && deliveryPercent < 100) {
        console.log("run 1");
        changeCurrentLabel(1);
    } else if (100 <= deliveryPercent) {
        console.log("run 2");
        changeCurrentLabel(2);
    }
}

// 执行 渲染页面核心区
renderMain();
// 执行 计算进度条百分比函数
calculateDeliveryPercent();
