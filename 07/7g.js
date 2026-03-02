function convertLength(length, from, to) {
    if (from === "km") {
        if (to === "miles") {
    
            return length / 1.6+" miles";
        } else if (to === "km") {
            return length +" km";
        }
    } else if (from === "miles" ) {
        if (to === "km") {
            return length * 1.6 +" km";
        } else if (to === "miles") {
            return length +" miles";
        }
    } else {
        return "input error";
    }
}

console.log(convertLength(50, "miles", "km"));
console.log(convertLength(32, "km", "miles"));
console.log(convertLength(50, "km", "km"));
