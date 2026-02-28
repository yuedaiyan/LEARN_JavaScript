class Car {
    brand;
    model;
    speed;
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
        this.speed = 0;
    }

    displayInfo() {
        console.log(`${this.brand} ${this.model}, Speed:  ${this.speed} km/h`);
    }
    go() {
        this.speed += 5;
        this.limitedSpeed();
    }
    brake() {
        this.speed -= 5;
        this.limitedSpeed();
    }

    limitedSpeed() {
        if (this.speed >= 200) {
            this.speed = 200;
        }
        if (this.speed <= 0) {
            this.speed = 0;
        }
    }
}

const car_1 = new Car("Toyota", "Corolla");
const car_2 = new Car("Tesla", "Model 3");

// console.log(car_1);
// console.log(car_2);

car_1.displayInfo();
car_2.displayInfo();

car_1.go();
car_1.go();
car_1.go();
car_1.go();
car_1.go();
car_1.go();
car_1.go();

car_2.go();
car_2.brake();
car_2.brake();
car_2.brake();
car_2.brake();

car_1.displayInfo();
car_2.displayInfo();
