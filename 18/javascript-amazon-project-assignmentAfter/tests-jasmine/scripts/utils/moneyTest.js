// Two Types of Test Cases
// 1. Basic test cases
// = tests if the code is working
// 2. Edge cases
// = test with values that are tricky

// 两种测试集:
// 1.基础测试集
// 2.边界测试集

import { formatCurrency } from "../../../scripts/utils/money.js";

// describe("test suite: formatCurrency", () => {
describe("test suite: 金额格式变换", () => {
    it("converts cents into dollars", () => {
        expect(formatCurrency(2095)).toEqual("20.95");
    });
    it("works with 0", () => {
        expect(formatCurrency(0)).toEqual("0.00");
    });
    it("rounds up to the nearest cent", () => {
        expect(formatCurrency(2000.5)).toEqual("20.01");
    });
    it("16a: rounds down to the nearest cent", () => {
        expect(formatCurrency(2000.4)).toEqual("20.00");
    });
    it("16b: 测试负数", () => {
        expect(formatCurrency(-2000)).toEqual("-20.00");
    });
});