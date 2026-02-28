class Car {
    brand;
    model;
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }
}

const car_1=new Car("Toyota","Corolla")
const car_2=new Car("Tesla","Model 3")

console.log(car_1);
console.log(car_2);