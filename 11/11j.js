const nums_1 = [1, 2, 3];
const nums_2 = [-2, -1, 0, 99];
const nums_3 = [1, 1, 3];
const nums_4 = [4, 5, 6];
const nums_5 = [1, 1, 2];

function getLastValue(array_input) {
    return array_input[array_input.length - 1];
}

function getFirstvalue(array_input) {
    return array_input[0];
}

function arraySwap(array_input) {
    const first_el = getFirstvalue(array_input);
    const last_el = getLastValue(array_input);
    array_input[0] = last_el;
    array_input[array_input.length - 1] = first_el;
    return array_input;
}

function addOne(array_input) {
    for (let i = 0; i < array_input.length; i++) {
        array_input[i]++;
    }
    return array_input;
}

function addNum(array_i, num_i) {
    const array_r = [];
    for (let i = 0; i < array_i.length; i++) {
        array_r.push(array_i[i] + num_i);
    }
    return array_r;
}

function addArrays(array_1, array_2) {
    const array_r = [];
    for (let i = 0; i < array_1.length; i++) {
        array_r.push(array_1[i] + array_2[i]);
    }
    return array_r;
}

console.log(addArrays(nums_5,nums_3));
console.log(addArrays(nums_1,nums_4));