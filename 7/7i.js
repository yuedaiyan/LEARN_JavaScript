function convertLength(length, from, to) {
    if (from === "km") {
        if (to === "miles") {
            return length / 1.6 + " miles";
        } else if (to === "km") {
            return length + " km";
        } else if (to === "ft") {
            return length * 3281 + " ft";
        } else {
            return `Invalide unit: ${to}`;
        }
    } else if (from === "miles") {
        if (to === "km") {
            return length * 1.6 + " km";
        } else if (to === "miles") {
            return length + " miles";
        } else if (to === "ft") {
            return length * 5280 + " ft";
        } else {
            return `Invalide unit: ${to}`;
        }
    } else {
        return `Invalide unit: ${from} and ${to}`;
    }
}

console.log(convertLength(50, "miles", "km"));
console.log(convertLength(32, "km", "miles"));
console.log(convertLength(50, "km", "km"));

console.log(convertLength(5, "miles", "km"));
console.log(convertLength(5, "miles", "ft"));
console.log(convertLength(5, "km", "ft"));

console.log(convertLength(5, "lbs", "Ibs"));
