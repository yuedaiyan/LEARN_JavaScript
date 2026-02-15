function addNum(array_in, num_in) {
    return array_in.map((element) => (element += num_in));
}

console.log(addNum([1, 2, 3],2));
console.log(addNum([-2, -1, 0,99],2));
