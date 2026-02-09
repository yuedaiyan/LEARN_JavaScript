const foods = ["egg", "apple", "egg", "egg", "ham"];
const foods_2 = ["egg", "apple", "egg", "egg", "ham"];

function removeEgg(array_in, word_in) {
    const retarr = [];
    for (let i = 0; i < array_in.length; i++) {
        if (array_in[i] !== word_in) {
            retarr.push(array_in[i]);
        }
    }
    return retarr;
}

function removeEgg_2(array_in, word_in) {
    const retarr = [];
    let k = 0;
    for (let i = 0; i < array_in.length; i++) {
        if (k >= 2 || array_in[i] !== word_in) {
            // not the egg
            retarr.push(array_in[i]);
            console.log(`add ${array_in[i]}`);
        } else {
            // is the egg
            console.log(`pass ${array_in[i]}`);
            k++;
        }
    }
    return retarr;
}

function removeEgg_2_reverse(array_in, word_in) {
    array_in.reverse();
    console.log('\n');
    console.log('f1');
    console.log(array_in);
    console.log('\n');
    const retarr = [];
    let k = 0;
    for (let i = 0; i < array_in.length; i++) {
        if (k >= 2 || array_in[i] !== word_in) {
            // not the egg
            retarr.push(array_in[i]);
            console.log(`add ${array_in[i]}`);
        } else {
            // is the egg
            console.log(`pass ${array_in[i]}`);
            k++;
        }
    }
    return retarr.reverse();
}

function removeEgg_2_reverse_slice(array_in, word_in) {
    array_in=array_in.slice().reverse();
    console.log('\n');
    console.log('f2');
    console.log(array_in);
    console.log('\n');
    const retarr = [];
    let k = 0;
    for (let i = 0; i < array_in.length; i++) {
        if (k >= 2 || array_in[i] !== word_in) {
            // not the egg
            retarr.push(array_in[i]);
            console.log(`add ${array_in[i]}`);
        } else {
            // is the egg
            console.log(`pass ${array_in[i]}`);
            k++;
        }
    }
    return retarr.reverse();
}
// console.log(removeEgg_2_reverse(foods_2, "egg"));
console.log('\n');
console.log('\n');
console.log(removeEgg_2_reverse_slice(foods_2, "egg"));
console.log(foods_2);