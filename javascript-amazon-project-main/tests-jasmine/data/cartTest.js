// Best Practice
// Test each condition of an if-statement
import { addToCart, cart, loadFromStorage } from "../../data/cart.js";
// console.log(cart);

describe("test suite: addToCart", () => {
    //
    it("adds an existing product to the cart", () => {
        // 劫持函数: localStorage.getItem → 替换为空数组
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([{ productId: "9baab029f463f330bb33ed5676aa4dfd", quantity: 1, deliveryOptionId: "1" }]);
        });
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
        expect(cart[0].quantity).toEqual(2);

    });

    //
    it("adds a new product to the cart", () => {
        // 劫持函数: localStorage.getItem → 替换为空数组
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([]);
        });
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
