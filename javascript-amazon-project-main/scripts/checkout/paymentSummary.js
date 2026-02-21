// 导入购物车列表
import { cart } from "../../data/cart.js";
// 导入商品清单,查找完整商品信息函数
import { products, getProductFromProducts } from "../../data/products.js";
// 导入三档快递时间,档位信息查找函数
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
// 导入money从美分转换为美元的计算函数
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem) => {
        const product = getProductFromProducts(cartItem.productId);
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
                        <div>Items (3):</div>
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

                    <div class="payment-summary-row total-row">
                        <div>Order total:</div>
                        <div class="payment-summary-money">
                            $${formatCurrency(productPriceCents + shippingPriceCents + taxCents)}
                        </div>
                    </div>

                    <button class="place-order-button button-primary">Place your order</button> 
    `;

    // 修改 DOM
    document.querySelector(".js-payment-summary").innerHTML=paymentSummaryHTML;
}
