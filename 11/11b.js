const nums = [1, 20, 22, 24, 5];
const words=['hi','hello','good']
function getLastValue(array_input){
    return array_input[array_input.length-1];
}


console.log(getLastValue(nums));
console.log(getLastValue(words));