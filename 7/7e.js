function convertToFahrenheit(c) {
    return (c * 9) / 5 + 32;
}

function convertToCelsius(f) {
    return (f - 32) * 5 / 9;
}
// let c = 25;
// let f = convertToFahrenheit(c);
// console.log(f);
let f = 86;
let c = convertToCelsius(f);
console.log(c);
