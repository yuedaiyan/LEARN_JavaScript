// 2 things to test:(主要测试两部分)
// 1. How the page looks(1.测试页面的长相)
// 2. How the page behaves(2.测试页面的行为逻辑)

import { renderOrderSummary } from "../../../scripts/checkout/orderSummary.js";
import { cart } from "../../../data/cart-class.js";

describe("test suite: renderOrderSummary", () => {
    // 初始化数据(全局变量,让beforeEach()和it()都可以使用)
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    beforeEach(() => {
        // 模拟:创建一个 js-order-summary 的容器,以便于 renderOrderSummary 往里面拼接字符串
        document.querySelector(".js-test-container").innerHTML = `
                <div class="js-order-summary"></div>
                <div class="js-return-to-home-link"></div>
                <div class="js-payment-summary"></div>
            `;

        // 劫持函数: localStorage.getItem → 替换为空数组
        spyOn(localStorage, "getItem");

        // 直接向 cart.cartItems 中注入商品
        cart.cartItems = [
            { productId: productId1, quantity: 2, deliveryOptionId: "1" },
            { productId: productId2, quantity: 1, deliveryOptionId: "2" },
        ];
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

        // 测试: 商品名称名字是否显示
        expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toContain("Black and Gray Athletic Cotton Socks - 6 Pairs");
        // 测试: 金额部分是否显示
        expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual("$10.90");
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

        expect(cart.cartItems.length).toEqual(1);

        // 测试: 商品名称名字是否显示
        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toContain("Intermediate Size Basketball");
        // 测试: 金额部分是否显示
        expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual("$20.95");
    });

    afterEach(() => {
        // 清空页面上遗留的HTML
        document.querySelector(".js-test-container").innerHTML = "";
    });
});

describe("updating the delivery option", () => {
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
        spyOn(localStorage, "getItem");

        // 直接向 cart.cartItems 中注入商品
        cart.cartItems = [
            { productId: productId1, quantity: 2, deliveryOptionId: "1" },
            { productId: productId2, quantity: 1, deliveryOptionId: "2" },
        ];

        // 呼叫被测试主函数
        renderOrderSummary();
    });

    it("测试: 可否成功将商品1的寄送方式从 1 → 3", () => {
        const productContainer = document.querySelector(`.js-delivery-options-${productId1}`);
        // 测试 选项1 已处于点击状态
        const radio1 = productContainer.querySelector(`.js-delivery-option[data-delivery-option-id="1"] .delivery-option-input`);
        expect(radio1.checked).toBe(true);

        // 将寄送选项从 1 改到 3
        const radio3 = productContainer.querySelector(`.js-delivery-option[data-delivery-option-id="3"] .delivery-option-input`);
        radio3.click();
        // 测试 选项3 已处于点击状态
        expect(radio3.checked).toBe(true);

        // 购物车长度测试
        expect(cart.cartItems.length).toEqual(2);

        // 最终价格测试
        const paymentSummaryMoney = document.querySelector(".js-payment-summary-row .js-payment-summary-money");
        expect(paymentSummaryMoney.innerText).toEqual("$63.50");
    });

    afterEach(() => {
        // 清空页面上遗留的HTML
        document.querySelector(".js-test-container").innerHTML = "";
    });
});
