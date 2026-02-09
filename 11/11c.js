const nums = [1, 20, 22, 24, 5];
const words = ["hi", "hello", "good"];

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

console.log(arraySwap(nums));
console.log(arraySwap(words));