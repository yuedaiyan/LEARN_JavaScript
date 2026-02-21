import dayjs from "dayjs";
import {isWeekend} from './15e.js'

// console.log(isWeekend);
console.log(isWeekend(dayjs().add(2,"day")));