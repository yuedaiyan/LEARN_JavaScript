// Best Practice
// Test each condition of an if-statement
// 测试要求
// 1.被测试函数中的每个if逻辑,都应测试
import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

// 测试 "加入购物车"
describe("test suite: addToCart", () => {
    // 物品已经存在于购物车之中
    it("adds an existing product to the cart", () => {
        // 劫持函数: localStorage.getItem → 替换为空数组
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([{ productId: "9baab029f463f330bb33ed5676aa4dfd", quantity: 1, deliveryOptionId: "1" }]);
        });
        // 将cart数组直接提出到栈中,模拟cart.js中,cart数组也一直在栈中的效果
        loadFromStorage();
        // 劫持函数: 获取用户选择的数量
        spyOn(document, "querySelector").and.callFake(() => {
            return { value: "1" };
        });
        // 劫持函数: localStorage.setItem → null
        spyOn(localStorage, "setItem");

        // 测试部分
        addToCart("9baab029f463f330bb33ed5676aa4dfd");
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify([{ productId: "9baab029f463f330bb33ed5676aa4dfd", quantity: 2, deliveryOptionId: "1" }]));
        expect(cart[0].productId).toEqual("9baab029f463f330bb33ed5676aa4dfd");
        expect(cart[0].quantity).toEqual(2);
    });

    // 购物车中没有当前物品(购物车未空)
    it("adds a new product to the cart", () => {
        // 劫持函数: localStorage.getItem → 替换为空数组
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([]);
        });
        // 将cart数组直接提出到栈中,模拟cart.js中,cart数组也一直在栈中的效果
        loadFromStorage();
        // 劫持函数: 获取用户选择的数量
        spyOn(document, "querySelector").and.callFake(() => {
            return { value: "1" };
        });
        // 劫持函数: localStorage.setItem → null
        spyOn(localStorage, "setItem");

        // 测试部分
        addToCart("9baab029f463f330bb33ed5676aa4dfd");
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("9baab029f463f330bb33ed5676aa4dfd");
        expect(cart[0].quantity).toEqual(1);
    });
});
