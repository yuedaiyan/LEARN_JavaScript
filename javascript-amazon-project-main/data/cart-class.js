// 典型 cart 形式
// 0: {productId: '9baab029f463f330bb33ed5676aa4dfd', quantity: 1, deliveryOptionId: '2'}
// 1: {productId: 'a7ad3bba44ce67fcd915e5c9dc4bd455', quantity: 1, deliveryOptionId: '1'}
// 2: {productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 4, deliveryOptionId: '2'}

export class Cart {
    // 核心 list
    cartItems;
    // 类私有属性
    #localStorageKey;

    // 自动初始化程序(每次创建对象时,自动执行)
    // constructor 不能 return
    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();

        // 购物车刷新至视频中状态(两件商品)
        // this.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        // this.addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");
        // console.log(this.cartItems);
    }

    // 读取本地储存的购物车数组
    // loadFromStorage: function () {
    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) ?? [];
    }

    // 将购物车信息 储存到本地 local storage 中
    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    // 仅加入一份商品至购物车
    addOneProductToCart(productId) {


        // 检测当前cart中是否已经有商品了
        let marchingId;
        this.cartItems.forEach((cartItem) => {
            // item:当前条目
            if (cartItem.productId === productId) {
                return (marchingId = cartItem);
            }
        });

        if (marchingId) {
            // 已经在列表中了 → 修改数量
            marchingId.quantity += 1;
        } else {
            // 不再列表中 → 需要将其加入到列表中
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: "1",
            });
        }
        // 更新本地存储的购物车信息
        this.saveToStorage();

    }

    // 商品加入函数 (点击 Add 按钮触发)
    addToCart(productId) {
        // TODO: 18r 此处逻辑不好,不应依赖DOM,建议拆分逻辑,js只接受数字
        // 获取用户的选择数量
        const selectValueEl = document.querySelector(`.js-quantity-selector-${productId}`)?.value ?? "1";
        const selectValue = Number(selectValueEl);

        // 检测当前cart中是否已经有商品了
        let marchingId;
        this.cartItems.forEach((cartItem) => {
            // item:当前条目
            if (cartItem.productId === productId) {
                return (marchingId = cartItem);
            }
        });

        if (marchingId) {
            // 已经在列表中了 → 修改数量
            marchingId.quantity += selectValue;
        } else {
            // 不再列表中 → 需要将其加入到列表中
            this.cartItems.push({
                productId: productId,
                quantity: selectValue,
                deliveryOptionId: "1",
            });
        }
        // 更新本地存储的购物车信息
        this.saveToStorage();
    }

    // 删除商品(在结算页面,点击删除按钮触发)
    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
        // 更新本地存储的购物车信息
        this.saveToStorage();
    }

    // 更新购物车内特定商品的寄送时间
    updateDeliveryOption(productId, deliveryOptionId) {
        if (deliveryOptionId === "1" || deliveryOptionId === "2" || deliveryOptionId === "3") {
            // 输入合法
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                    cartItem.deliveryOptionId = deliveryOptionId;
                }
            });
            // 更新本地存储的购物车信息
            this.saveToStorage();
        } else {
            // 输入不合法 → 直接返回空
            return;
        }
    }

    // 计算整个购物车中的商品总数
    calculateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    }

    // 通过 id 和 quantity 更新cart中指定商品的数量
    updateQuantity(productId, newQuantity) {
        this.cartItems.forEach((product) => {
            if (product.productId === productId) {
                product.quantity = newQuantity;
            }
        });
        // 更新本地存储的购物车信息
        this.saveToStorage();
    }

    // 通过id获得指定的商品
    getProductFromCart(productIdFind) {
        return this.cartItems.find((product) => {
            return product.productId === productIdFind;
        });
    }

    // 更新购物车内特定商品的寄送时间
    updateDeliveryOption(productId, deliveryOptionId) {
        if (deliveryOptionId === "1" || deliveryOptionId === "2" || deliveryOptionId === "3") {
            // 输入合法
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                    cartItem.deliveryOptionId = deliveryOptionId;
                }
            });
            // 更新本地存储的购物车信息
            this.saveToStorage();
        } else {
            // 输入不合法
            return;
        }
    }

    // 清空购物车(主要供下单的场景使用 → 下单自动清空购物车)
    removeWholeCart() {
        this.cartItems = [];
        // 更新本地存储的购物车信息
        this.saveToStorage();
        // 检查并输出
        const cartCount = this.calculateCartQuantity();
        console.log('removeWholeCart: ',cartCount);
    }
}

// const cart = new Cart('cart-oop');
// const businessCart = new Cart('cart-business');

export const cart = new Cart("cart-class");

// 演示,解决回调地域
// 使用后端购物车("https://supersimplebackend.dev")
// export let cartFromBackend = [];
// export function loadCart(func_s) {
//     const xhr = new XMLHttpRequest();
//     xhr.addEventListener("load", () => {
//         // console.log(xhr.response);
//         // 服务器已成功返回数据
//         console.log('load cart from "https://supersimplebackend.dev/cart"');
//         func_s();
//     });
//     xhr.open("GET", "https://supersimplebackend.dev/cart");
//     xhr.send();
// }

// assignment 18h
// 使用异步函数处理相关问题
export async function loadCartFetch() {
    const response = await fetch("https://supersimplebackend.dev/cart");
    const data = await response.text();
    console.log('Use async fetch(), load cart from "https://supersimplebackend.dev/cart"');
    console.log('data form fetch: \n',data);
    return data
}
// loadCartFetch();
