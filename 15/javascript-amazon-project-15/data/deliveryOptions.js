export const deliveryOptions = [
    {
        id: "1",
        deliveryDays: 7,
        priceCents: 0,
    },
    {
        id: "2",
        deliveryDays: 3,
        priceCents: 499,
    },
    {
        id: "3",
        deliveryDays: 1,
        priceCents: 999,
    },
];

// 输入cart中储存的该商品寄送id,来获取具体的寄送时间和价格(默认返回值为id: 1 = 7天)
export function getDeliveryOption(deliveryOptionId) {
    return deliveryOptions.find((option) => option.id === deliveryOptionId) || deliveryOptions[0];
}

// 传入寄送时间obj → 返回格式化的送达时间(默认时间计算单位为'day')
export function calculateDeliveryDate(deliveryOption) {
    // 结合今天的时间,计算实际送达时间
    const deliveryDate = today.add(deliveryOption.deliveryDays, "day");
    // 将送达时间格式化
    return deliveryDate.format("dddd, MMMM D");
}
