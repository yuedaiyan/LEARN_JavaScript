// 初始化购物车列表
let productsHTML = "";

// 依据js文件:data/product.js中的list,逐条生成HTML
products.forEach((product) => {
    productsHTML += `
                   <div class="product-container">
                    <div class="product-image-container">
                        <img class="product-image" src="${product.image}" />
                    </div>

                    <div class="product-name limit-text-to-2-lines">${product.name}</div>

                    <div class="product-rating-container">
                        <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png" />
                        <div class="product-rating-count link-primary">${product.rating.count}</div>
                    </div>

                    <div class="product-price">${(product.priceCents / 100).toFixed(2)}</div>

                    <div class="product-quantity-container ">
                        <select class="js-quantity-selector-${product.id}">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>

                    <div class="product-spacer"></div>

                    <div class="added-to-cart">
                        <img src="images/icons/checkmark.png" />
                        Added
                    </div>

                    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                </div> 
    `;
});
// console 打印页面中所有商品条目的HTML
console.log(productsHTML);

// 讲生成的商品条目HTML,加入到.js-products-grid中,以供渲染
document.querySelector(".js-products-grid").innerHTML = productsHTML;

// 给每个按钮添加监听器 → 添加到购物车列表
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        // console.log("打印新加入商品: ", button.dataset.productId);

        // 获取用户的选择数量
        const selectValue=Number(document.querySelector(`.js-quantity-selector-${button.dataset.productId}`).value);
        // console.log(selectValue);



        // 检测当前cart中是否已经有商品了
        let marchingId;
        cart.forEach((item) => {
            // item:当前条目
            if (item.productId === button.dataset.productId) {
                return (marchingId = item);
            }
        });

        if (marchingId) {
            // 已经在列表中了 → 修改数量
            marchingId.quantity+=selectValue;
        } else {
            // 不再列表中 → 需要将其加入到列表中
            cart.push({
                productId: button.dataset.productId,
                quantity: selectValue,
            });
        }

        // 初始化购物车内商品数量
        let cartQuantity = 0;
        cart.forEach((item) => {
            cartQuantity += item.quantity;
        });
        console.log("cart quantity: ", cartQuantity);
        console.log("打印购物车: ", cart);

        // 修改屏幕右上角购物车商品数量
        document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    });
});
