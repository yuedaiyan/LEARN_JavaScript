const nums_1 = [1, 2, 3];
const nums_2 = [-2, -1, 0, 99];

function addOne(array_input) {
    const array_r=[];
    for (let i = 0; i < array_input.length; i++) {
        array_r.push(array_input[i]+1);
    }
    return array_r;
}

function addNum(array_i, num_i) {
    const array_r=[];
    for (let i = 0; i < array_i.length; i++){
        array_r.push(array_i[i]+num_i)
    }
    return array_r
}



