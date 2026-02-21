import dayjs from "dayjs";
import { isWeekend as isSatSun } from "./15e.js";

// console.log(isWeekend);
console.log(isSatSun(dayjs().add(2, "day")));
