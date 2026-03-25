// 搜索函数
function search() {
    const searchButtonEl = document.querySelector(".js-search-button");

    searchButtonEl.addEventListener("click", () => {
        // 获取 input 的数据
        const searchValue = document.querySelector(".js-search-bar").value;
        console.log("search button click: ", searchValue);

        // 执行页面跳转
        const params = new URLSearchParams();
        params.append("search", searchValue);
        window.location.href = `amazon.html?${params.toString()}`;
    });
}

// 监听 enter 键盘按键 → 实现 search 功能
function enterSearch() {
    document.addEventListener("keyup", (keyUp) => {
        if (keyUp.key === "Enter") {
            document.querySelector(`.js-search-button`).click();
        }
    });
}

// 执行 监听enter函数
enterSearch();
// 执行 搜索函数
search();
