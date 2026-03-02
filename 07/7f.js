function convertToFahrenheit(c) {
    return (c * 9) / 5 + 32;
}

function convertToCelsius(f) {
    return ((f - 32) * 5) / 9;
}

function convertTempereaure(unit, degrees){
    if (unit === 'c') {
        return convertToFahrenheit(degrees)+' f';
    } else if (unit === 'f') {
        return convertToCelsius(degrees)+' c';
    } else {
        return ("error");
    }
}

// let c = 25;
// let f = convertToFahrenheit(c);
// console.log(f);
// let f = 86;
// let c = convertToCelsius(f);
// console.log(c);

console.log(convertTempereaure('c', 25));
console.log(convertTempereaure("f", 86));