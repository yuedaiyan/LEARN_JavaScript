// 石头剪刀布游戏按钮
const buttonRockEl = document.querySelector(".js_button_rock");
const buttonPaperEl = document.querySelector(".js_button_paper");
const buttonScissorsEl = document.querySelector(".js_button_scissors");

// 中间的分数显示系统…
const divResultTextEl = document.querySelector(".js_div_resultText");
const divResultEmojiEl = document.querySelector(".js_div_resultEmoji");
const divRankBoardEl = document.querySelector(".js_div_rankBoard");

// reset 和 autoplay 按钮
const buttonResetEl = document.querySelector(".js_button_reset");
const buttonAutoPlayEl = document.querySelector(".js_button_autoPlay");

// 初始化自动游戏状态:false
let autoPlayState = false;
// 初始化本局游戏状态:3(0:平局,1:玩家获胜,2:电脑获胜)
let gameResult = 3;

//  自动读取记分板上的分数 如果没有,则赋值 0 0 0
let rankBoard = JSON.parse(localStorage.getItem("rankBoardLocalStorage")) ?? {
    userWin: 0,
    computerWin: 0,
    tie: 0,
};

// 初始化记分板
refreshRankBoard();

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
// 用户点击 → 触发函数
function game(user_input) {
    // 获得用户输入和计算机输入
    const userInput = user_input;
    console.log(`User choose ${userInput} ${showResultInText(userInput)}`);
    const computerInput = computerRadom();
    console.log(`Computer choose ${computerInput} ${showResultInText(computerInput)}`);

    // 结果比较 → 输出结果仍为数字
    gameResult = (userInput - computerInput + 3) % 3;
    // 0:tie 1:user win 2:computer win
    refreshResultText();
    refreshResultEmojiBoard(userInput, computerInput);
    refreshRankBoard();
    // 自动将记分板保存至localStorage中
    console.log(rankBoard);
    localStorage.setItem("rankBoardLocalStorage", JSON.stringify(rankBoard));
}

// 复原记分板函数
function resetRankBoard() {
    rankBoard = {
        userWin: 0,
        computerWin: 0,
        tie: 0,
    };

    // 自动将记分板保存至localStorage中
    console.log(rankBoard);
    refreshRankBoard();
    localStorage.setItem("rankBoardLocalStorage", JSON.stringify(rankBoard));
}

// 自动游戏按钮
let intervalIndex;
function activeAutoPlayButton() {
    autoPlayState = !autoPlayState;
    changeAutoPlayButton();
    if (autoPlayState) {
        intervalIndex = setInterval(() => {
            game(computerRadom());
        }, 100);
    } else {
        clearInterval(intervalIndex);
    }
}

// 结果显示\记分区域效果设计
function refreshResultText() {
    if (gameResult === 0) {
        rankBoard.tie++;
        console.log(`Game result: ${gameResult} Tie`);
        divResultTextEl.innerText = "Tie";
    } else if (gameResult === 1) {
        rankBoard.userWin++;
        console.log(`Game result: ${gameResult} User win`);
        divResultTextEl.innerText = "User Win";
    } else if (gameResult === 2) {
        rankBoard.computerWin++;
        console.log(`Game result: ${gameResult} Computer win`);
        divResultTextEl.innerText = "Computer Win";
    }
}

// 辅助函数:通过数字,返回图片路径
function returnImgSrcForm012(num_in) {
    if (num_in === 0) {
        return "<img src='image/rock-emoji.png' />";
    }
    if (num_in === 1) {
        return "<img src='image/paper-emoji.png' />";
    }
    if (num_in === 2) {
        return "<img src='image/scissors-emoji.png' />";
    }
}

// 刷新图片展示板函数
function refreshResultEmojiBoard(userInput, computerInput) {
    divResultEmojiEl.innerHTML = `User: ${returnImgSrcForm012(userInput)} Computer: ${returnImgSrcForm012(computerInput)}`;
}

// 刷新记分展示板函数
function refreshRankBoard() {
    divRankBoardEl.innerText = `Tie: ${rankBoard.tie} User: ${rankBoard.userWin} Computer: ${rankBoard.computerWin}`;
}

// 安装函数:增加按钮点击 → css变化效果
function normalButtonClickCss(button_in, cssActive_in) {
    button_in.addEventListener("mousedown", () => {
        button_in.classList.add(cssActive_in);
    });
    button_in.addEventListener("mouseup", () => {
        button_in.classList.remove(cssActive_in);
    });
    button_in.addEventListener("mouseleave", () => {
        button_in.classList.remove(cssActive_in);
    });
}

// Auto Play button特殊处理,注意颜色的切换状态而非点击
function changeAutoPlayButton() {
    if (autoPlayState) {
        buttonAutoPlayEl.classList.add("css_button_reset_active");
        buttonAutoPlayEl.innerText = "Stop Playing";
    }
    if (!autoPlayState) {
        buttonAutoPlayEl.classList.remove("css_button_reset_active");
        buttonAutoPlayEl.innerText = "Auto Play";
    }
}

// 总装函数
// 参数一:button_in(目标按钮)
// 参数二:clickFunction_in(click之后会触发的函数)
// 参数三:clickFunction_in(click之后会触发的函数)
// 参数四:clickIndex_in(事件监听按键)
// 参数五:cssActive_in(交互的高亮效果)
function bindButtonClick(button_in, clickFunction_in_1, clickFunction_in_2, clickIndex_in, cssActive_in) {
    // 绑定高亮效果
    normalButtonClickCss(button_in, cssActive_in);
    // 绑定click行为 1
    button_in.addEventListener("click", () => {
        clickFunction_in_1?.();
    });
    // 绑定click行为 2
    button_in.addEventListener("click", () => {
        clickFunction_in_2?.();
    });
    // 绑定keydown
    document.addEventListener("keydown", (element) => {
        if (element.key === clickIndex_in) {
            button_in.classList.add(cssActive_in);
        }
    });
    // 绑定keyup
    document.addEventListener("keyup", (element) => {
        if (element.key === clickIndex_in) {
            button_in.click();
            button_in.classList.remove(cssActive_in);
        }
    });
}

bindButtonClick(
    buttonRockEl,
    () => {
        game(0);
    },
    undefined,
    "1",
    "css_button_reset_active",
);
bindButtonClick(
    buttonPaperEl,
    () => {
        game(1);
    },
    undefined,
    "2",
    "css_button_reset_active",
);
bindButtonClick(
    buttonScissorsEl,
    () => {
        game(2);
    },
    undefined,
    "3",
    "css_button_reset_active",
);
bindButtonClick(
    buttonResetEl,
    () => {
        warningOn();
    },
    undefined,
    "Backspace",
    "css_button_reset_active",
);
bindButtonClick(buttonAutoPlayEl, activeAutoPlayButton, undefined, "a", "css_button_reset_active");

// 点击reset之后的确认框
const divWarningAreaEl = document.querySelector(".js_area_warning");
let buttonWarningYesEl = "";
let buttonWarningNoEl = "";

function warningOff() {
    divWarningAreaEl.innerHTML = "";
}

function warningOn() {
    divWarningAreaEl.innerHTML = `
            <div class="js_div_warning css_div_warning">Are you sure you want to reset the score?</div>
            <button class="js_warning_yes css_warning_yes">Yes</button>
            <button class="js_warning_no css_warning_no">no</button>
            `;

    // 确认环节
    buttonWarningYesEl = document.querySelector(".js_warning_yes");
    buttonWarningNoEl = document.querySelector(".js_warning_no");

    bindButtonClick(buttonWarningYesEl, warningOff, resetRankBoard, "y", "css_warning_button_active");
    bindButtonClick(buttonWarningNoEl, warningOff, undefined, "n", "css_warning_button_active");

    // // 绑定click
    // buttonWarningYesEl.addEventListener("click", () => {
    //     warningOff();
    //     resetRankBoard();
    // });
    // buttonWarningNoEl.addEventListener("click", () => {
    //     warningOff();
    // });

    // // 绑定键盘y和n
    // document.addEventListener("keyup", (element) => {
    //     if (element.key === "y") {
    //         warningOff();
    //         resetRankBoard();
    //     }
    //     if (element.key === "n") {
    //         warningOff();
    //     }
    // });
}
