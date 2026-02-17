// 购物车列表(在scripts/amazon.js中修改)
export const cart = [];

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