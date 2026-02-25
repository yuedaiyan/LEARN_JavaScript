import dayjs from "dayjs";

function isWeekend(date) {
    if (date.format("dddd") === "Sunday" || date.format("dddd") === "Saturday") {
        // console.log('right');
        return true;
    } else {
        return false;
    }
}

// console.log(isWeekend(dayjs().add(2, "day")));

let receivingDay = dayjs();
console.log("receivingDay", receivingDay);
for (let i = 0; i < deliveryOption.deliveryDays; i++) {
    if (isWeekend(receivingDay.add(1, "day")) === true) {
        // 这一天的确是周末
        console.log("receivingDay in if", receivingDay);
    } else {
        // 这一天不是周末
        console.log("receivingDay in if", receivingDay);
    }
}