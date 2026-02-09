const words_1 = ["hello", "world", "search", "good"];
const words_2 = ["not", "found"];
const words_3 = ["hello", "world", "search", "good", "search"];

function searchArray(array_in, word_in) {
    for (let i = 0; i < array_in.length; i++) {
        if (array_in[i] === word_in) {
            return i;
        }
    }
    return -1;
}

console.log(searchArray(words_1, "search"));
console.log(searchArray(words_2, "search"));
console.log(searchArray(words_3, "search"));
