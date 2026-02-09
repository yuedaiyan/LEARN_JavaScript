const words=['apple','grape','apple','apple']
function countWords(words_in) {
    const retobj = {};
    for (let i = 0; i < words_in.length; i++){
        if (Object.hasOwn(retobj, words_in[i])) {
            // turn: has
            retobj[words_in[i]]++; 
        } else {
            // false: has not
            retobj[words_in[i]] = 1;
        }
    }
    return retobj;
}

console.log(countWords(words));