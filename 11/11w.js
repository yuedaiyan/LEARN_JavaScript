const words_1 = ["green", "red", "blue", "red"];
const words_2 = ["red", "green", "green", "red"];


function findIndex(arr_in,word_in) {
    console.log(`findIndex: word_in: ${word_in} result: ${arr_in.indexOf(word_in)}`);
    return arr_in.indexOf(word_in);
}

function unique(arr_in) {
    const retarr=[]
    for (let i = 0; i < arr_in.length; i++){
        if (findIndex(retarr,arr_in[i]) === -1) {
            retarr.push(arr_in[i])
        }
    }
    return retarr;
}

console.log(unique(words_1));
console.log(unique(words_2));