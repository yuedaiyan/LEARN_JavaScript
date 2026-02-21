// 购物车列表(在scripts/amazon.js中修改)
// 从local storage中加载购物车列表,如果加载失败,则加载空列表
export let cart = JSON.parse(localStorage.getItem("cart")) ?? [];
// TODO 没有使用购物车中的 quantities 来刷新商品页面右上角的购物车内商品数量

// 将购物车信息 储存到本地 local storage 中
function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// 商品加入函数 (点击 Add 按钮触发)
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
            // TODO: 这句话是调试的时候,补充的,最后要删除
            deliveryOptionId: "3",
        });
    }
    // 更新本地存储的购物车信息
    saveToStorage();
}

// 删除商品(在结算页面,点击删除按钮触发)
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

// 计算整个购物车中的商品总数
export function calculateCartQuantity(cart) {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}

// 通过 id 和 quantity 更新cart中指定商品的数量
export function updateQuantity(productId, newQuantity) {
    cart.forEach((product) => {
        if (product.productId === productId) {
            product.quantity = newQuantity;
        }
    });
    // 更新本地存储的购物车信息
    saveToStorage();
}

// 通过id获得指定的商品
export function getProduct(productIdFind) {
    return cart.find((product) => {
        return product.productId === productIdFind;
    });
}

// // 更新购物车内特定商品的寄送时间
export function updateDeliveryOption(productId,deliveryOptionId){
    cart.forEach((cartItem) =>{
        if(cartItem.productId === productId){
            cartItem.deliveryOptionId=deliveryOptionId
        }
    })
    // 更新本地存储的购物车信息
    saveToStorage();
}


// 导出cart
console.log('cart:',cart);