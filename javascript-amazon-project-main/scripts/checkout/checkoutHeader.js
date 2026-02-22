// 导入购物车列表
import { cart, removeFromCart, updateDeliveryOption, calculateCartQuantity, updateQuantity, getProductFromCart } from "../../data/cart.js";
// 更新页面上方购物车函数
export function renderCheckoutHeader() {
    document.querySelector(".js-return-to-home-link").innerHTML = `${calculateCartQuantity(cart)}  items`;
}
// function refreshReturnToHomeLink() {}
