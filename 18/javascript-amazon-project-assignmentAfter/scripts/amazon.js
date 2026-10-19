// 导入商品清单
import { products, loadProducts } from "../data/products.js";
// 导入购物车列表
import { cart } from "../data/cart-class.js";
// 导入购物车内商品总数计算函数
// import { calculateCartQuantity } from "../data/cart-class.js";
// 导入 忽略大小写搜索 函数
import { includesIgnoreCase, includesKeywords } from "./utils/searchKeyWords.js";
// 导入 keyword 搜索函数
import { searchProduct } from "../data/productsWithKeywords.js";

// 执行 搜索框检查函数,检查是否从搜索中进入本页面
checkURL();

// 初始化购物车列表
let productsHTML = "";

// 进入页面后自检 url 中的 search 参数
function checkURL() {
    // 获取搜索输入值
    const searchParams = new URL(window.location.href).searchParams.get("search");
    if (searchParams) {
        console.log("have params: search mode ", searchParams);
        // 仅渲染搜索中提到的商品
        loadProducts(() => {
            renderSearchProducts(searchParams);
        });
    } else {
        console.log("no params: render all product");
        loadProducts(renderProductsGrid);
    }
}

// 普通模式: 渲染完整商品列表
function renderProductsGrid() {
    // 初始化pressId(用户记录显示的绿色icon Id)
    const pressId = {};

    // 依据js文件:data/product.js中的list,逐条生成HTML
    products.forEach((product) => {
        productsHTMLAdd(product);
    });

    // 将生成的商品条目HTML,加入到.js-products-grid中,以供渲染
    document.querySelector(".js-products-grid").innerHTML = productsHTML;

    // 初始化购物车内商品数量
    let cartQuantity = 0;
    // 使用实际的cart数据,更新购物车数量
    cartQuantity = cart.calculateCartQuantity(cart);
    // 刷新屏幕
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

    // Add 绿色提示
    function showAddedToCartIcon(productId) {
        // 提前取消上一轮遗留的显示效果(如果显示效果存在的话(即便不存在,setTimeOut也不会报错))
        clearTimeout(pressId[productId]);
        // 点击 Add 按钮之后,上面出现绿色的提示
        const addedToCartEl = document.querySelector(`.js-added-to-cart-${productId}`);
        addedToCartEl.classList.add("added-to-cart-pressed");
        pressId[productId] = setTimeout(() => {
            addedToCartEl.classList.remove("added-to-cart-pressed");
            delete pressId[productId];
        }, 1500);
    }

    // 给每个按钮添加监听器 → 添加到购物车列表
    document.querySelectorAll(".js-add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            const { productId } = button.dataset;
            cart.addToCart(productId);

            // 刷新屏幕:修改屏幕右上角购物车商品数量
            document.querySelector(".js-cart-quantity").innerHTML = cart.calculateCartQuantity(cart);

            showAddedToCartIcon(productId);
        });
    });
}

// 搜索模式: 渲染特定商品
function renderSearchProducts(searchParams) {
    // 依据js文件:data/product.js中的list,逐条生成HTML
    products.forEach((product) => {
        console.log('00');
        console.log(product.name);        
        // 逐个检查商品名称中是否包含搜索关键字,有则渲染,没有则跳过
        const nameCheck = includesIgnoreCase(product.name, searchParams);
        const keywrodsCheck = searchProduct(product.id, searchParams);
        console.log("nameCheck: ", nameCheck, "keywordsCheck: ", keywrodsCheck, "\nmatching product:", product.name);
        if (nameCheck || keywrodsCheck) {
            // 只有检测到了,才会添加到渲染队列中
            productsHTMLAdd(product);
        }
    });

    // 将生成的商品条目HTML,加入到.js-products-grid中,以供渲染
    document.querySelector(".js-products-grid").innerHTML = productsHTML;

    // 初始化购物车内商品数量
    let cartQuantity = 0;
    // 使用实际的cart数据,更新购物车数量
    cartQuantity = cart.calculateCartQuantity(cart);
    // 刷新屏幕
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

    // 初始化pressId(用户记录显示的绿色icon Id)
    const pressId = {};
    // Add 绿色提示
    function showAddedToCartIcon(productId) {
        // 提前取消上一轮遗留的显示效果(如果显示效果存在的话(即便不存在,setTimeOut也不会报错))
        clearTimeout(pressId[productId]);
        // 点击 Add 按钮之后,上面出现绿色的提示
        const addedToCartEl = document.querySelector(`.js-added-to-cart-${productId}`);
        addedToCartEl.classList.add("added-to-cart-pressed");
        pressId[productId] = setTimeout(() => {
            addedToCartEl.classList.remove("added-to-cart-pressed");
            delete pressId[productId];
        }, 1500);
    }

    // 给每个按钮添加监听器 → 添加到购物车列表
    document.querySelectorAll(".js-add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            const { productId } = button.dataset;
            cart.addToCart(productId);

            // 刷新屏幕:修改屏幕右上角购物车商品数量
            document.querySelector(".js-cart-quantity").innerHTML = cart.calculateCartQuantity(cart);

            showAddedToCartIcon(productId);
        });
    });
}

function productsHTMLAdd(product) {
    productsHTML += `
                   <div class="product-container">
                    <div class="product-image-container">
                        <img class="product-image" src="${product.image}" />
                    </div>

                    <div class="product-name limit-text-to-2-lines">${product.name}</div>

                    <div class="product-rating-container">
                        <img class="product-rating-stars" src="${product.getStarsUrl()}" />
                        <div class="product-rating-count link-primary">${product.rating.count}</div>
                    </div>

                    <div class="product-price">${product.getPrice()}</div>

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
<!-- 添加尺码选择部分 -->
                    ${product.extraInfoHTML()}
<!--  -->
                    <div class="product-spacer"></div>

<!-- 添加绿色的 Added 提示标 -->
                    <div class="added-to-cart js-added-to-cart-${product.id}">
                        <img src="images/icons/checkmark.png" />
                        Added
                    </div>

                    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                </div> 
    `;
}
