const obj_1 = {
    name: "basketball",
    price: 2095,
};

// console.log(obj_1);
// obj_1.price += 500;
// console.log(obj_1);
// obj_1["delivery-time"] = "3 days";
// console.log(obj_1);

const obj_2 = {
    name: "baseball",
    price: 1000,
};

function comparePrice(p1, p2) {
    return obj_1.price <= obj_2.price ? obj_1.name : obj_2.name;
}
console.log(comparePrice(obj_1, obj_2));

function isSameProduct(p1, p2) {
    return p1.name === p2.name && p1.price === p2.price ? true : false;
}

console.log(isSameProduct(obj_1,obj_1));