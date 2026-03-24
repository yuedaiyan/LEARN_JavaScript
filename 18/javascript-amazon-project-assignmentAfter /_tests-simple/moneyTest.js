// Two Types of Test Cases
// 1. Basic test cases
// = tests if the code is working
// 2. Edge cases
// = test with values that are tricky

import { formatCurrency } from "../scripts/utils/money.js";

function test(_input, _result) {
    if (formatCurrency(_input) === _result) {
        console.log("  passed ->", _input);
    } else {
        console.log("! failed ->", _input);
    }
}
console.log("test suite: formatCurrency:");
test(2095, "20.95");
test(0, "0.00");
test(2000.5, "20.01");
test(2000.4, "20.00");
