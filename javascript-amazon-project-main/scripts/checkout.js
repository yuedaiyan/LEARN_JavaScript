// 导入: 渲染左侧商品菜单函数
import { renderOrderSummary } from "./checkout/orderSummary.js";
// 导入: 渲染右侧总金额计算函数
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

// 导入: cart-oop.js
// import '../data/cart-oop.js'

// 导入: cart-class.js
import '../data/cart-class.js'

// 执行: 渲染左侧商品菜单函数
renderOrderSummary();
// 执行: 渲染右侧总金额计算函数
renderPaymentSummary();
