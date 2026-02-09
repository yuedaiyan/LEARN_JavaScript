const nums_1 = [1, 2, 3];
const nums_2=[-2,-1,0,99]

function addOne(array_input) {
    for (let i = 0; i < array_input.length; i++) {
        array_input[i]++;
    }
    return array_input;
}

console.log(addOne(nums_1));
console.log(addOne(nums_2));