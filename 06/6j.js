let a = Math.random();
let myResult = "hands";
let result;
if (a < 0.5) {
    // console.log("hands");
    result = "hands";
} else {
    // console.log("tails");
    result = "tails";
}

console.log(myResult === result ? 'you win' : 'you lose');
// if (myResult === result) {
//     console.log("you win");
// } else {
//     console.log("you lose");
// }
