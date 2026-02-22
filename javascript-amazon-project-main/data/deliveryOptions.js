// 导入时间模块
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
// import dayjs from "dayjs";

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

// 全局变量: 今天的时间 (dayjs obj 格式)
const today = dayjs();

// 输入cart中储存的该商品寄送id,来获取具体的寄送时间和价格(默认返回值为id: 1 = 7天)
export function getDeliveryOption(deliveryOptionId) {
    return deliveryOptions.find((option) => option.id === deliveryOptionId) || deliveryOptions[0];
}

// 传入寄送时间obj → 返回格式化的送达时间(默认时间计算单位为'day')
// 注意,已经通过在函数名前面添加 _ 来变相注释(删除)了函数,此函数在实际页面中并不会被引用
export function _calculateDeliveryDate(deliveryOption) {
    // 结合今天的时间,计算实际送达时间
    const deliveryDate = today.add(deliveryOption.deliveryDays, "day");
    // 将送达时间格式化
    return deliveryDate.format("dddd, MMMM D");
}

// 传入寄送时间obj → 返回格式化的送达时间(默认时间计算单位为'day')
// 检测周末(忽略周末版)
export function calculateDeliveryDate(deliveryOption) {
    let receivingDay = dayjs();
    let deliveryDay = deliveryOption.deliveryDays;
    for (let i = 0; i < deliveryDay; i++) {
        if (isWeekend(receivingDay.add(1, "day")) === true) {
            // 这一天的确是周末(增加一天寄送周期来变相忽略周末)
            deliveryDay++;
        } 
        // 在当前的基础上增加一天
        receivingDay = receivingDay.add(1, "day");
    }
    // 将送达时间格式化,并返回
    return receivingDay.format("dddd, MMMM D");
}

// 周末检测函数: 接受 dayjs对象 → 返回true和false
function isWeekend(date) {
    if (date.format("dddd") === "Sunday" || date.format("dddd") === "Saturday") {
        return true;
    } else {
        return false;
    }
}
