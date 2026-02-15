function removeEgg(array_in) {
    return array_in.filter((element) => element !== "egg");
}
const array_1 = ["egg", "apple", "egg", "egg", "ham"];

console.log(removeEgg(array_1));
