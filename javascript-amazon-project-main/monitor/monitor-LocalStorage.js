console.log("from monitor");
window.addEventListener("storage", (e) => {
    console.log("变化的 key:", e.key);
    console.log("旧值:", e.oldValue);
    console.log("新值:", e.newValue);
    console.log("来源 URL:", e.url);
});

