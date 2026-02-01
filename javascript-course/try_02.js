const s = Symbol("hidden");

const obj = {
    a: 1,
    [s]: 2,
};

console.log(Object.keys(obj));
console.log(obj);

// ["a"]
for (const k in obj) {
} // 只看到 "a"
console.log(JSON.stringify(obj)) ;
