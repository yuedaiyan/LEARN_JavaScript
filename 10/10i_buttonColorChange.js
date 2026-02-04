numberEl.forEach((button) => {
    button.addEventListener("mousedown", () => {
        button.classList.add("css_number_button_press");
    });
    button.addEventListener("mouseup", () => {
        button.classList.remove("css_number_button_press");
    });
    button.addEventListener("mouseleave", () => {
        button.classList.remove("css_number_button_press");
    });
});

symbolEl.forEach((button) => {
    button.addEventListener("mousedown", () => {
        button.classList.add("css_symbol_button_press");
    });
    button.addEventListener("mouseup", () => {
        button.classList.remove("css_symbol_button_press");
    });
    button.addEventListener("mouseleave", () => {
        button.classList.remove("css_symol_button_press");
    });
});

clearEl.forEach((button) => {
    button.addEventListener("mousedown", () => {
        button.classList.add("css_clear_button_press");
    });
    button.addEventListener("mouseup", () => {
        button.classList.remove("css_clear_button_press");
    });
    button.addEventListener("mouseleave", () => {
        button.classList.remove("css_clear_button_press");
    });
});
