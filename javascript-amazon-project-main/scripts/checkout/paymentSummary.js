// 导入购物车列表
import { cart } from "../../data/cart-class.js";
// 导入商品清单,查找完整商品信息函数
import { products, getProductFromProducts, loadProductsFetch } from "../../data/products.js";
// 导入三档快递时间,档位信息查找函数
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
// 导入money从美分转换为美元的计算函数
import { formatCurrency } from "../utils/money.js";

import { addOrder } from "../../data/orders.js";

export async function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let itemsNumbers = 0;
    await loadProductsFetch();
    cart.cartItems.forEach((cartItem) => {
        const product = getProductFromProducts(cartItem.productId);
        // 计算商品总数量
        itemsNumbers += cartItem.quantity;
        // 计算商品条目总价: 价格*数量
        productPriceCents += product.priceCents * cartItem.quantity;
        // 计算商品运费:运费
        shippingPriceCents += getDeliveryOption(cartItem.deliveryOptionId).priceCents;
    });

    // 计算商品税收: 总价*10%
    const taxCents = (productPriceCents + shippingPriceCents) * 0.1;
    const paymentSummaryHTML = `
                    <div class="payment-summary-title">Order Summary</div>

                    <div class="payment-summary-row">
                        <div>Items (${itemsNumbers}):</div>
                        <div class="payment-summary-money">
                            $${formatCurrency(productPriceCents)}
                        </div>
                    </div>

                    <div class="payment-summary-row">
                        <div>Shipping &amp; handling:</div>
                        <div class="payment-summary-money">
                            $${formatCurrency(shippingPriceCents)}
                        </div>
                    </div>

                    <div class="payment-summary-row subtotal-row">
                        <div>Total before tax:</div>
                        <div class="payment-summary-money">
                            $${formatCurrency(productPriceCents + shippingPriceCents)}
                        </div>
                    </div>

                    <div class="payment-summary-row">
                        <div>Estimated tax (10%):</div>
                        <div class="payment-summary-money">
                            $${formatCurrency(taxCents)}
                        </div>
                    </div>

                    <div class="payment-summary-row total-row js-payment-summary-row">
                        <div>Order total:</div>
                        <div class="payment-summary-money js-payment-summary-money">
                            $${formatCurrency(productPriceCents + shippingPriceCents + taxCents)}
                        </div>
                    </div>

                    <button class="place-order-button button-primary js-palce-roder">
                        Place your order
                    </button> 
    `;

    // 修改 DOM
    document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

    // 购物车页面点击结算效果 → 点击后请求后端的结算页面
    document.querySelector(".js-palce-roder").addEventListener("click", async () => {
        try {
            const response = await fetch("https://supersimplebackend.dev/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cart: cart }),
            });
            const order = await response.json();
            // console.log('make an order',order);
            addOrder(order);
        } catch (error) {
            console.log('@paymentSummary.js|function .js-place-order."click"\nUnexpected error.\nPlease try again later.');
        }

        // 点击下单按钮之后,自动清空购物车
        cart.removeWholeCart();
        // 跳转到订单界面
        window.location.href = "orders.html";
    });
}

console.log("shor cart:",cart);