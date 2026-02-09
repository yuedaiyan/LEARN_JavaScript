const foods = ["egg", "apple", "egg", "egg", "ham"];
const foods_2=['egg', 'apple', 'egg', 'egg', 'ham']

function removeEgg(array_in,word_in) {
    const retarr=[]
    for (let i = 0; i < array_in.length; i++){
        
        if (array_in[i] !== word_in) {
            retarr.push(array_in[i])
        }
    }
    return retarr;
}

console.log(removeEgg(foods,'egg'));