// 导入: 渲染左侧商品菜单函数
import { renderOrderSummary } from "./checkout/orderSummary.js";
// 导入: 渲染右侧总金额计算函数
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// 导入: 后端购物车
import { products, loadProducts } from "../data/products.js";

// 在页面中载入 products
loadProducts(() => {
    // 执行: 渲染左侧商品菜单函数
    renderOrderSummary();
    // 执行: 渲染右侧总金额计算函数
    renderPaymentSummary();
});
// 导入: cart-oop.js
// import '../data/cart-oop.js'

// 导入: cart-class.js
// import '../data/cart-class.js'

// 导入: 17a 作业
// import '../data/car.js'

// 18: learn backend
// import '../data/backend-practice.js'

// // 执行: 渲染左侧商品菜单函数
// renderOrderSummary();
// // 执行: 渲染右侧总金额计算函数
// renderPaymentSummary();
