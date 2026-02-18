// 购物车列表(在scripts/amazon.js中修改)
export let cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
    },
];

export function addToCart(productId) {
    // console.log("打印新加入商品: ", productId);
    // 获取用户的选择数量
    const selectValue = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    // console.log(selectValue);

    // 检测当前cart中是否已经有商品了
    let marchingId;
    cart.forEach((cartItem) => {
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
        cart.push({
            productId: productId,
            quantity: selectValue,
        });
    }
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    cart = newCart;
}
