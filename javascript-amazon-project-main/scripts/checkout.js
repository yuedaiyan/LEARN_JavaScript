// 导入: 渲染左侧商品菜单函数
import { renderOrderSummary } from "./checkout/orderSummary.js";
// 导入: 渲染右侧总金额计算函数
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// 导入: 后端购物车
import { products, loadProducts, loadProductsFetch } from "../data/products.js";

// 导入: cart-oop.js
// import '../data/cart-oop.js'

// 导入: cart-class.js
// import '../data/cart-class.js'

// 导入: 17a 作业
// import '../data/car.js'

// 18: learn backend
// import '../data/backend-practice.js'
// 演示回调地域
import { loadCart } from "../data/cart-class.js";

// console.log('in checkout',loadProductsFetch());

async function loadPage() {
    try {
        // throw "error1"
        await loadProductsFetch();
        await new Promise((resolve) => {
            loadCart(() => {
                resolve();
            });
        });
    } catch (error) {
        console.log("@chechout.js|loadPage()\nUnexpected error.\nPlease try again later.");
    console.log(error);
    }
    // 执行: 渲染左侧商品菜单函数
    renderOrderSummary();
    // 执行: 渲染右侧总金额计算函数
    renderPaymentSummary();
}
loadPage();

// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     }),
// ]).then(() => {
//     // 执行: 渲染左侧商品菜单函数
//     renderOrderSummary();
//     // 执行: 渲染右侧总金额计算函数
//     renderPaymentSummary();
// });

// // 18: learn Promise()
// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve();
//     });
// })
//     .then(() => {
//         return new Promise((resolve) => {
//             loadCart(() => {
//                 resolve();
//             });
//         });
//     })
//     .then(() => {
//         // 执行: 渲染左侧商品菜单函数
//         renderOrderSummary();
//         // 执行: 渲染右侧总金额计算函数
//         renderPaymentSummary();
//     });

// // 使用后端: 在页面中载入 products
// loadProducts(() => {
//     // 执行: 渲染左侧商品菜单函数
//     renderOrderSummary();
//     // 执行: 渲染右侧总金额计算函数
//     renderPaymentSummary();
// });

// // 执行: 渲染左侧商品菜单函数
// renderOrderSummary();
// // 执行: 渲染右侧总金额计算函数
// renderPaymentSummary();
