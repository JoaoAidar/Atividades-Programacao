//Criamos a classe Car 
class Car {
    constructor(brand, model, year,color) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
    }

    turnEngineOn() {
        console.log('Engine on');
    }
}

class ElectricCar extends Car {
    constructor(brand, model, year,color, autonomy,batteryType) {
        super(brand, model, year,color);
        this.autonomy = autonomy;
        this.batteryType = batteryType;
    }
}

let tesla = new ElectricCar('Tesla', 'Model S', 2020,'Blue', 400,'Li-ion');
tesla.turnEngineOn();
console.log(tesla);