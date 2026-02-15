function contPositive(array_in) {
    let retval = 0;
    array_in.forEach(element => {
        if(element>0){retval++}
    });
    return retval;
}

const array_1=[1, -3, 5];
const array_2=[-2, 3, -5, 7, 101];

console.log(contPositive(array_1));
console.log(contPositive(array_2));
