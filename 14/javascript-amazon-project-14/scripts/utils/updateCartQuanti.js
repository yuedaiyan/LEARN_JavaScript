export function updateCartQuantity(cart) {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    if (cartQuantity === 0) {
        cartQuantity=''
    }
    return cartQuantity;
}
