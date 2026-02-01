// const ob_product = {
//     name: "sock",
//     price: 1090,
//     ob_in: { name: "good", price: 50 },
// };

// console.log(ob_product);
// console.log(ob_product.name);
// console.log(ob_product.price);
// console.log(ob_product.ob_in);

// delete ob_product.ob_in;
// console.log(ob_product);

// ob_product.name = "cotton socks";
// console.log(ob_product);
// console.log(ob_product.name);

// console.log("---------------");

// const product_2 = {
//     ob_name: "shirt",
//     delivery_time: "1 day",
//     rating: {
//         stars: 4.5,
//         count: 87,
//     },
//     fun: function function_1() {
//         console.log("function inside obj");
//     },
// };

// console.log(product_2);
// console.log(product_2.ob_name);
// console.log(product_2["ob_name"]);
// console.log(product_2.rating.stars);

// product_2.fun();

// const json_1 = JSON.stringify(product_2);
// console.log(json_1);
// console.log(typeof json_1);
// console.log('---------------')
// const json_2 = JSON.parse(json_1);
// console.log(json_2);
// console.log(typeof json_2);

// console.log('hello'.length);
// console.log('hello'.toUpperCase());

// const obj_1 = {
//     message: 'good'
// }

// // const m_1 = obj_1.message;
// // console.log(m_1);
// // console.log(typeof m_1)
// // const m_2 = obj_1;
// // console.log(m_2);
// // console.log(typeof m_2)
// const { m_3 } = obj_1;
// console.log(typeof m_3)
// console.log(m_3)

// const object_4 = {
//     message: 'Good job!'
// }
// const { message } = object_4;
// console. log(message);

const name = "alice";
const age = 22;

const girl = {
    name,
    age,
    infor() {
        console.log(this.name, this.age);
    },
};
console.log(girl);
girl.infor()
