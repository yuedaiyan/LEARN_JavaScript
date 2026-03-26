// Best Practice
// Test each condition of an if-statement
// 测试要求
// 1.被测试函数中的每个if逻辑,都应测试

// 使用 cart-class.js
import { Cart } from "../../data/cart-class.js";

// 测试 addToCart() 函数
describe("test suite: cart.addToCart", () => {
    // 测试: 物品已经存在于购物车之中
    it("adds an existing product to the cart", () => {
        // 在class的环境下,loadFromStorage为私有方法,无法访问.这里因此直接覆盖相关值.
        // 劫持函数: localStorage.getItem → 提前放入两个商品
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
                { productId: "a7ad3bba44ce67fcd915e5c9dc4bd455", quantity: 1, deliveryOptionId: "1" },
                { productId: "9baab029f463f330bb33ed5676aa4dfd", quantity: 1, deliveryOptionId: "1" },
            ]);
        });
        // 劫持函数: localStorage.setItem → null
        spyOn(localStorage, "setItem")

        // 创建 cart 类
        const cart = new Cart("cart-test");

        // 测试部分
        cart.addToCart("9baab029f463f330bb33ed5676aa4dfd",3);
        expect(cart.cartItems.length).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "cart-test",
            JSON.stringify([
                { productId: "a7ad3bba44ce67fcd915e5c9dc4bd455", quantity: 1, deliveryOptionId: "1" },
                { productId: "9baab029f463f330bb33ed5676aa4dfd", quantity: 4, deliveryOptionId: "1" },
            ]),
        );
        expect(cart.cartItems[1].productId).toEqual("9baab029f463f330bb33ed5676aa4dfd");
        expect(cart.cartItems[1].quantity).toEqual(4);
    });

    // 购物车中没有当前物品(购物车未空)
    it("adds a new product to the cart", () => {
        // 劫持函数: localStorage.getItem → 使其为空
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([]);
        });
        // 劫持函数: localStorage.setItem → null
        spyOn(localStorage, "setItem");

        // 创建 cart 类
        const cart = new Cart("cart-test");

        // 测试部分
        cart.addToCart("9baab029f463f330bb33ed5676aa4dfd",2);
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith("cart-test", JSON.stringify([{ productId: "9baab029f463f330bb33ed5676aa4dfd", quantity: 2, deliveryOptionId: "1" }]));
        expect(cart.cartItems[0].productId).toEqual("9baab029f463f330bb33ed5676aa4dfd");
        expect(cart.cartItems[0].quantity).toEqual(2);
    });
});

// 测试: 删除购物车中的商品
describe("test suit: cart.removeFromCart (删除购物车中的商品)", () => {
    // 创建 cart 类
    const cart = new Cart("cart-test");
    // 提前准备:
    beforeEach(() => {
        // 劫持函数: localStorage.getItem → 提前放入两个商品
        spyOn(localStorage, "getItem");
        // 劫持函数: 获取用户选择的数量
        spyOn(document, "querySelector").and.callFake(() => {
            return { value: "1" };
        });
        // 劫持函数: localStorage.setItem → null
        spyOn(localStorage, "setItem");

        cart.cartItems = [
            { productId: "a7ad3bba44ce67fcd915e5c9dc4bd455", quantity: 1, deliveryOptionId: "1" },
            { productId: "9baab029f463f330bb33ed5676aa4dfd", quantity: 1, deliveryOptionId: "1" },
        ];
    });

    it("remove a productId that is in the cart.", () => {
        cart.removeFromCart("a7ad3bba44ce67fcd915e5c9dc4bd455");
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith("cart-test", JSON.stringify([{ productId: "9baab029f463f330bb33ed5676aa4dfd", quantity: 1, deliveryOptionId: "1" }]));
    });

    it("remove a productId that's not in the cart (does nothing).", () => {
        cart.removeFromCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");
        expect(cart.cartItems.length).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "cart-test",
            JSON.stringify([
                { productId: "a7ad3bba44ce67fcd915e5c9dc4bd455", quantity: 1, deliveryOptionId: "1" },
                { productId: "9baab029f463f330bb33ed5676aa4dfd", quantity: 1, deliveryOptionId: "1" },
            ]),
        );
    });
});

describe("test suit: cart.updateDeliveryOption() (更改购物车中特定商品额数量)", () => {
    // 创建 cart 类
    const cart = new Cart("cart-test");
    // 提前准备:
    // TODO: 这里的放入应该为模拟放入
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    beforeEach(() => {
        // 劫持函数: localStorage.getItem → 提前放入两个商品
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
                { productId: productId1, quantity: 1, deliveryOptionId: "1" },
                { productId: productId2, quantity: 1, deliveryOptionId: "1" },
            ]);
        });

        // 劫持函数: localStorage.setItem → null
        spyOn(localStorage, "setItem");

        cart.cartItems = [
            { productId: productId1, quantity: 1, deliveryOptionId: "1" },
            { productId: productId2, quantity: 1, deliveryOptionId: "1" },
        ];
    });

    it("basic test: 普通的改变数量测试", () => {
        const testCart = cart.cartItems[0];
        // 测试: 未修改状态下的 quantity 是不是1
        expect(testCart.deliveryOptionId).toEqual("1");
        // 测试: 修改了之后的 quantity → 3
        cart.updateDeliveryOption(productId1, "3");
        expect(testCart.deliveryOptionId).toEqual("3");
        // 测试: SetItem 结果正确
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "cart-test",
            JSON.stringify([
                { productId: `${productId1}`, quantity: 1, deliveryOptionId: "3" },
                { productId: `${productId2}`, quantity: 1, deliveryOptionId: "1" },
            ]),
        );
    });

    it("illegal input test: 如果堆不存在购物车中的商品修改 deliveryOptionId, 函数应该自动 return, 不改变 cart 中的任何信息", () => {
        // 测试: 堆不存在购物车中的 productId3 进行 update…
        const productId3 = "aaaaaaa-bbbb-ccccc-dddddd-eeeeeee";
        cart.updateDeliveryOption(productId3, "3");
        expect(cart.cartItems[0]).toEqual({ productId: productId1, quantity: 1, deliveryOptionId: "1" });
        expect(cart.cartItems[1]).toEqual({ productId: productId2, quantity: 1, deliveryOptionId: "1" });
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "cart-test",
            JSON.stringify([
                { productId: `${productId1}`, quantity: 1, deliveryOptionId: "1" },
                { productId: `${productId2}`, quantity: 1, deliveryOptionId: "1" },
            ]),
        );
    });

    it("illegal input test: 尝试堆 update 函数传入一个不存在的寄送id 7", () => {
        cart.updateDeliveryOption(productId1, "4");
        expect(cart.cartItems[0]).toEqual({ productId: productId1, quantity: 1, deliveryOptionId: "1" });

        // 如果输入不合法,函数直接 return, 不会尝试写入 localStorage
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});
