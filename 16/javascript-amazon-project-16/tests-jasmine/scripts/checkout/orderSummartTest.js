// 2 things to test:(主要测试两部分)
// 1. How the page looks(1.测试页面的长相)
// 2. How the page behaves(2.测试页面的行为逻辑)

import { renderOrderSummary } from "../../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../../data/cart.js";

describe("test suite: renderOrderSummary", () => {
    // 初始化数据(全局变量,让beforeEach()和it()都可以使用)
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    // 初始化共享设置
    beforeEach(() => {
        // 模拟:创建一个 js-order-summary 的容器,以便于 renderOrderSummary 往里面拼接字符串
        document.querySelector(".js-test-container").innerHTML = `
                <div class="js-order-summary"></div>
                <div class="js-return-to-home-link"></div>
                <div class="js-payment-summary"></div>
            `;

        // 劫持函数: localStorage.getItem → 替换为空数组
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
                { productId: productId1, quantity: 2, deliveryOptionId: "1" },
                { productId: productId2, quantity: 1, deliveryOptionId: "2" },
            ]);
        });
        // 将上面的劫持假cart数组结果,载入栈中
        loadFromStorage();

        // 呼叫被测试主函数
        renderOrderSummary();
    });

    // 测试页面长相部分
    it("display the cart", () => {
        // 测试部分
        expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(2);
        // 测试特点的商品id下,quantity容器部分是不是包含"Quantity: 2"
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain("Quantity: 2");
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain("Quantity: 1");

    // 测试: 两件商品的名字是不是显示在了页面上
expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toContain("Black and Gray Athletic Cotton Socks - 6 Pairs");

    });

    // 测试交互行为: 删除按钮
    it("removes a product", () => {
        // 补充:劫持函数: localStorage.setItem → null
        spyOn(localStorage, "setItem");

        // 原本有两个条目
        expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(2);
        // 删除一个条目
        document.querySelector(`.js-delete-link-${productId1}`).click();
        // 测试发现只有一个了
        expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(1);
        // 删除之后,第一个条目应为空
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        // 删除之后,第二个条目应正常
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);

        expect(cart.length).toEqual(1);

    // 测试: 两件商品的名字是不是显示在了页面上
expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toContain("Intermediate Size Basketball");
    });

    afterEach(() => {
        // 清空页面上遗留的HTML
        document.querySelector(".js-test-container").innerHTML = "";
    });
});
