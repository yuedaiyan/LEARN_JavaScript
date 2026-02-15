// 初始化状态
let user_choose = 0;
let computer_choose = 0;
let curr_result = "NO result";

// 读取 local storage 的分数清单 或 新建空分数清单
const score = JSON.parse(localStorage.getItem("score")) ?? {
    wins: 0,
    losses: 0,
    ties: 0,
};

// 初次打开网页的时候,在界面上展示积分情况(有可能是历史记录,也可能是0,0,0)
document.querySelector(".js-score").innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

// 随机数生成函数,返回 0 or 1 or 2
function computerGet() {
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

// 每次进行游戏,会自动向这个函数传入 0 or 1 or 2
// 此函数采用 onclick 触发
// rock:0 paper:1 scissors:2
function game(user_c) {
    // 获取用户输入(0\1\2)
    user_choose = user_c;
    // 获取计算机随机数输入(0\1\2)
    computer_choose = computerGet();
    // 控制台显示两者输入结果
    // console.log("-----------------");
    // console.log(`user: ${user_choose} | computer: ${computer_choose}`);

    // 游戏比较部分 → curr_result 保存"谁胜利了"的字符串(控制台输出),同时刷新积分
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

    // 三个按钮下面的文字区域显示结果
    document.querySelector(".js-show-result").innerHTML = `${curr_result}`;

    // 调用图片刷新函数,将结果用图片展示出来
    image_result_show(user_choose, computer_choose);

    // 在积分处,刷新分数
    document.querySelector(".js-score").innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

    // 控制台提示
    // console.log(`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);

    // save date in local
    localStorage.setItem("score", JSON.stringify(score));
    return;
}

// 复原分数函数
// 此函数采用 onclick 触发
function reset() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    document.querySelector(".js-score").innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    localStorage.setItem("score", JSON.stringify(score));
}

// 由 game() 函数调用的函数,用于刷新用户与电脑的选择(result 结果下面那行,图形那行)
function image_result_show(user_choose, computer_choose) {
    // console.log("--------------");
    // console.log(`function image_result_show call`);
    // console.log(`user input number: ${user_choose}`);
    // console.log(`computer input number: ${computer_choose}`);

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

    // console.log(`user: ${user_move}`);
    // console.log(`computer: ${computer_move}`);

    document.querySelector(".js-move").innerHTML = `You : <img class="css-move-image" src="image/${user_move}-emoji.png" /> Computer: <img class="css-move-image" src="image/${computer_move}-emoji.png" /> `;
}

// onclick auto paly 按钮触发
// 自动游戏函数
let autoPlayState = false; // 初始化自动执行状态(false)
let intervalId; // 循环函数的 ID
function autoPlay() {
    if (!autoPlayState) {
        // 点击按钮之前,未进行自动游戏 → 开始自动游戏
        autoPlayState = !autoPlayState;
        // 开始游戏
        // 使用间隔循环函数
        intervalId = setInterval(() => {
            // 直接调用随机数生成器,伪造用户输入
            game(computerGet());
        }, 1000);
    } else {
        // 点击按钮之前,已经在进行自动游戏了 → 关闭自动游戏
        autoPlayState = !autoPlayState;
        clearInterval(intervalId);
    }
}
// 使用事件监听函数
const button_1_El = document.querySelector(".js_button_1");
const button_2_El = document.querySelector(".js_button_2");
const button_3_El = document.querySelector(".js_button_3");
button_1_El.addEventListener("click", () => {
    game(0);
});
button_2_El.addEventListener("click", () => {
    game(1);
});
button_3_El.addEventListener("click", () => {
    game(2);
});

const button_reset_el =document.querySelector('.js_button_reset')
const button_autoPlay_el =document.querySelector('.js_button_autoPlay')
button_reset_el.addEventListener('click',()=>{reset()})
button_autoPlay_el.addEventListener('click',()=>{autoPlay()})

document.body.addEventListener('keydown', (event) => {
    // console.log(event.key);
    if (event.key === '1') {
        game(0)
    }
    if (event.key === '2') {
        game(1)
    }
    if (event.key === '3') {
        game(2)
    }
})