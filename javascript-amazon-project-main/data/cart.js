// 购物车列表(在scripts/amazon.js中修改)
// 从local storage中加载购物车列表,如果加载失败,则加载空列表
export let cart = JSON.parse(localStorage.getItem("cart")) ?? [];
// TODO 没有使用购物车中的 quantities 来刷新商品页面右上角的购物车内商品数量

// 将购物车信息 储存到本地 local storage 中
function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

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
    // 更新本地存储的购物车信息
    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    // 更新本地存储的购物车信息
    saveToStorage();
}
