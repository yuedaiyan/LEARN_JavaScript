// 导入: 左侧商品菜单函数
import { renderOrderSummary } from "./checkout/orderSummary.js";
// 导入: 右侧总金额计算函数
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

// 执行: 左侧商品菜单函数
renderOrderSummary();
// 折行: 右侧总金额计算函数
renderPaymentSummary();
