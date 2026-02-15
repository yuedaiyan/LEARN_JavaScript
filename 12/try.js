function computerRadom() {
    const radomInt = Math.random();
    if (radomInt < 1 / 3) {
        return 0;
    } else if (1 / 3 <= radomInt && radomInt < 2 / 3) {
        return 1;
    } else if (2 / 3 <= radomInt) {
        return 2;
    }
}
// rock:0
// paper:1
// scissors:2
function showResultInText(chooseNum) {
    if (chooseNum === 0) {
        return "rock";
    } else if (chooseNum === 1) {
        return "paper";
    } else if (chooseNum === 2) {
        return "scissors";
    } else {
        console.log("showResultInText function Error!");
    }
}
function game() {
    console.log("\n");
    const userInput = computerRadom();
    console.log(userInput);
    console.log(`User choose ${showResultInText(userInput)}`);
    const computerInput = computerRadom();
    console.log(computerInput);
    console.log(`Computer choose ${showResultInText(computerInput)}`);

    const gameResult = (userInput - computerInput + 3) % 3;
    // 0:tie 1:user win 2:computer win
        console.log('\n');
    if (gameResult === 0) {
        console.log("Tei");
    } else if (gameResult === 1) {
        console.log('User win');
    }
    else if (gameResult === 2) {
        console.log('Computer win');
    }
}

game();
