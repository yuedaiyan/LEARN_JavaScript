// TODO:查看orders.html中的TODO
// TODO:注意修改购物车中的商品数量

// 导入订单清单
import { orders } from "../data/orders.js";
// 0
// :
// {id: '8997d0c5-e6a6-4550-b19f-d9e3d27b497a', orderTime: '2026-03-23T19:09:53.264Z', totalCostCents: 6350, products: Array(2)}
// 1
// :
// {id: '66f3df50-0c75-4b0d-82a8-1f7708eaeb5a', orderTime: '2026-03-23T19:08:34.959Z', totalCostCents: 6350, products: Array(2)}
// 2
// :
// {id: '1063f268-093a-490f-8b92-fe3e04344bcd', orderTime: '2026-03-23T19:08:26.406Z', totalCostCents: 6350, products: Array(2)}
// 3
// :
// {id: '4048f735-8e2a-4245-83fd-80358f7bd884', orderTime: '2026-03-23T19:08:08.845Z', totalCostCents: 6350, products: Array(2)}
// length
// :
// 4

console.log('orders.js check');

// 订单渲染函数
function renderOneOrder() {
    let ordersGridHTML = `
    
<!-- order start -->
                <div class="order-container js-order-container">
                    
                    <div class="order-header">
                        <div class="order-header-left-section">
                            <div class="order-date">
                                <div class="order-header-label">Order Placed:</div>
                                <div>June 10</div>
                            </div>
                            <div class="order-total">
                                <div class="order-header-label">Total:</div>
                                <div>$41.90</div>
                            </div>
                        </div>

                        <div class="order-header-right-section">
                            <div class="order-header-label">Order ID:</div>
                            <div>b6b6c212-d30e-4d4a-805d-90b52ce6b37d</div>
                        </div>
                    </div>

<!-- order content section start -->
                    <div class="order-details-grid">

<!-- one order start -->
                        <div class="product-image-container">
                            <img src="images/products/intermediate-composite-basketball.jpg" />
                        </div>

                        <div class="product-details">
                            <div class="product-name">Intermediate Size Basketball</div>
                            <div class="product-delivery-date">Arriving on: June 17</div>
                            <div class="product-quantity">Quantity: 2</div>
                            <button class="buy-again-button button-primary">
                                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                                <span class="buy-again-message">Buy it again</span>
                            </button>
                        </div>

                        <div class="product-actions">
                            <a href="tracking.html">
                                <button class="track-package-button button-secondary">Track package</button>
                            </a>
                        </div>
<!-- one order end -->


<!-- order content section start -->
                    </div>
                </div>
<!-- orders end -->
    
    `;
    document.querySelector(".js-orders-grid").innerHTML = ordersGridHTML;
}

// 执行 订单渲染函数
renderOneOrder();

