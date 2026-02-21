import dayjs from "dayjs";
// console.log(dayjs().format("dddd"));

export function isWeekend(date) {
    if (date.format("dddd") === "Sunday" || date.format("dddd") === "Saturday") {
        // console.log('right');
        return true;
    } else {
        return false;
    }
}

function main() {
    console.log(isWeekend(dayjs().add(2, "day")));
}

// main()
