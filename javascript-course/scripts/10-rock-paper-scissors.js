let user_choose = 0;
let computer_choose = 0;
let curr_result = "NO result";

const score = JSON.parse(localStorage.getItem("score")) ?? {
    wins: 0,
    losses: 0,
    ties: 0,
};

document.querySelector(".js-score").innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

function computetGet() {
    const a = Math.random();
    // console.log(a);
    if (a <= 1 / 3) {
        return 0;
    } else if (a <= 2 / 3) {
        return 1;
    } else {
        return 2;
    }
}

// rock:0 paper:1 scissors:2
function game(user_c) {
    user_choose = user_c;
    computer_choose = computetGet();
    console.log("-----------------");
    console.log(`user: ${user_choose} | computer: ${computer_choose}`);

    if (user_choose === computer_choose) {
        // tie
        score.ties++;
        curr_result = "Tie";
        console.log("tie");
    } else {
        if ((user_choose - computer_choose + 3) % 3 === 1) {
            // user win
            score.wins++;
            curr_result = "User win";
            console.log("user win");
        } else {
            // computer win
            score.losses++;
            curr_result = "Computer win";
            console.log("computer win");
        }
    }
    document.querySelector(".js-show-result").innerHTML = `${curr_result}`;
    image_result_show(user_choose, computer_choose);
    document.querySelector(".js-score").innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    console.log(`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
    // save date in local
    localStorage.setItem("score", JSON.stringify(score));
    return;
}

function reset() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    document.querySelector(".js-score").innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    localStorage.setItem("score", JSON.stringify(score));
}

function image_result_show(user_choose, computer_choose) {
    console.log("--------------");
    console.log(`function image_result_show call`);
    console.log(`user input number: ${user_choose}`);
    console.log(`computer input number: ${computer_choose}`);

    let user_move;
    let computer_move;

    if (user_choose === 0) {
        user_move = "rock";
    } else if (user_choose === 1) {
        user_move = "paper";
    } else if (user_choose === 2) {
        user_move = "scissors";
    }

    if (computer_choose === 0) {
        computer_move = "rock";
    } else if (computer_choose === 1) {
        computer_move = "paper";
    } else if (computer_choose === 2) {
        computer_move = "scissors";
    }

    console.log(`user: ${user_move}`);
    console.log(`computer: ${computer_move}`);

    document.querySelector(".js-move").innerHTML = `You : <img class="css-move-image" src="image/${user_move}-emoji.png" /> Computer: <img class="css-move-image" src="image/${computer_move}-emoji.png" /> `;
}
