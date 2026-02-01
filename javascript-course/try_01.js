const ID = Symbol("id");

const obj = {};
obj[ID] = 123;
console.log(obj);
console.log(obj.ID);
console.log(obj[ID]);
console.log(obj.id)
console.log('_________')
const ED=Symbol('id')
obj[ED] = 456;
console.log(obj);
console.log(obj.ED);
console.log(obj[ED]);
console.log(obj.id)
