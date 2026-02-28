class Car {
    brand;
    model;
    speed;
    #isTrunkOpen;

    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
        this.speed = 0;
        this.#isTrunkOpen=false
    }

    displayInfo() {
        console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h, Trunk: ${this.#isTrunkOpen}`);
    }
    go() {
        if (this.#isTrunkOpen === false) {
            this.speed += 5;
            this.limitedSpeed();
        } else {
            return;
        }
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

    openTrunk() {
        // 只有当 speed=0 的时候,才可以 open 后备箱
        if (this.speed === 0) {
            this.#isTrunkOpen = true;
        } else {
            return;
        }
    }

    closeTrunk() {
        this.#isTrunkOpen = close;
    }
}

const car_1 = new Car("Toyota", "Corolla");
const car_2 = new Car("Tesla", "Model 3");
// const car_3 = new Car("McLaren", "F1");

// console.log(car_1);
// console.log(car_2);

car_1.displayInfo();
car_2.displayInfo();
