let toDoList_reverse = [];
let toDoList = JSON.parse(localStorage.getItem("toDoList_storage")) ?? [];
const divEl = document.querySelector(".js_div");

const inputTextEl = document.querySelector(".js_input_text");
const inputDateEl = document.querySelector(".js_input_date");

// refresh screen and local storage
function renderToDoList() {
    // refresh the input area
    inputTextEl.value = "";
    inputDateEl.value = "";
    // replace the html data to empty
    let html_code = "";
    toDoList_reverse = toDoList.slice().reverse();
    // show the toDoList on the html screen
    toDoList_reverse.forEach((item, index) => {
        html_code += `
                    <div class="css_input_row">
                        <div class='css_list_name'>${item.name}</div>
                        <div class='css_list_date'>${item.date}</div>
                        <button class="js_delButton css_delButton">
                            Delete
                        </button>
                    </div>
                            `;
    });

    // refresh the local storage
    localStorage.setItem("toDoList_storage", JSON.stringify(toDoList));

    // show result in the console
    console.log(html_code);

    // show toDoList
    console.log("toDoList: ");
    console.log(toDoList);
    // show toDoList reverse
    console.log("toDoList_reverse: ");
    console.log(toDoList_reverse);

    // refresh the html on screen
    divEl.innerHTML = html_code;

    // del
    const delButtonAllEl = document.querySelectorAll(".js_delButton");
    console.log(delButtonAllEl);
    delButtonAllEl.forEach((item, index) => {
        // removeItem(index);

        item.addEventListener("click", () => {
            removeItem(index);
        });
    });
}

// get the remove index of the list
function removeItem(index_in) {
    // update the doDoList
    console.log(index_in);
    let curr_list = toDoList_reverse.slice();
    curr_list.splice(index_in, 1);

    console.log("curr_list:");
    console.log(curr_list);

    toDoList = curr_list.reverse();
    renderToDoList();
}

/* === main part === */
renderToDoList();

function addToDoList() {
    // update the toDoList(list)
    const input_text = inputTextEl.value;
    const input_date = inputDateEl.value;
    toDoList.push({ name: input_text, date: input_date });
    // console.log(input_text);
    // console.log(input_date);
    renderToDoList();
    console.log(delButtonAllEl);
}

// 使用事件监听器,执行点击效果
// add
const addButtonEl = document.querySelector(".js_addButton");
addButtonEl.addEventListener("click", () => {
    addToDoList();
});
