// 2 things to test:
// 1. How the page looks
// 2. How the page behaves

import { renderOrderSummary } from "../../../scripts/checkout/orderSummary";
import { loadFromStorage } from "../../../data/cart.js";

describe('test suite: renderOrderSummary', () => {
    it('display the cart', () => {

        // 模拟 js-order-summary 容器,以便于 renderOrderSummary 往里面拼接字符串
        document.querySelector(".js-test-container").innerHTML = `
                <div class="js-order-summary"></div>
            `;

        // 劫持函数: localStorage.getItem → 替换为空数组
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify({ productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 2, deliveryOptionId: "1" }, { productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 1, deliveryOptionId: "2" });
        });
        loadFromStorage();
        // 劫持函数: 获取用户选择的数量
        // spyOn(document, "querySelector").and.callFake(() => {
        //     return { value: "1" };
        // });
        // 劫持函数: localStorage.setItem → null
        spyOn(localStorage, "setItem");



        
    })
})