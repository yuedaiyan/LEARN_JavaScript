function removeEgg(array_in) {
    let eggCount = 0;
    return array_in.filter((item) => {
        if (item === "egg" && eggCount < 2) {
            eggCount++;
            return false;
        }
        return true;
    });
}
const array_1 = ["egg", "apple", "egg", "egg", "ham"];

console.log(removeEgg(array_1));
