let carDetailsArray = [];
class Motor {
    constructor(id,mname,price,fuel,steering){
        this.id = id;
        this.name = mname;
        this.price = price;
        this.type = fuel;
        this.steering = steering;
    }
    setCurrentSpeed() {
        carDetailsArray[this.id - 1].speed = this.speed;
        Storage.saveItems(carDetailsArray);
    }
    setAcceleration() {
        this.speed = carDetailsArray[this.id - 1].speed;
        this.speed = this.speed + 10;
        this.setCurrentSpeed();
        return this.speed;
    }
    setBrake() {
        this.speed = carDetailsArray[this.id - 1].speed;
        return this.speed = this.speed - 10;
        this.setCurrentSpeed();
        return this.speed;
    }
    getDetails(){
        let output = `         Name : ${this.name}
         Price : ${this.price}
         Fuel Type : ${this.type}`;
        console.log(output);
    }
}

class Car extends Motor {
    constructor(id,mname,price,fuel,steering,speed) {
        super(id,mname,price,fuel,steering);
        this.speed = speed;
    }
    getAcceleration() {
        console.log(this.name + " Current speed increased into : " + this.setAcceleration() + " km/hrs");
        console.log("");
    }
    getBrake() {
        console.log(" Now the " +this.name + " car speed is reduced to : " + this.setBrake() + " km/hrs"); 
        console.log("");
    }
    setDetails(){
        console.log("       THE CAR DETAILS");
        this.getDetails();
        console.log("");
    }
}

class Bike extends Motor {
    constructor(id,mname,price,fuel,steering,speed) {
        super(id,mname,price,fuel,steering);
        this.speed = speed;
    }
    getAcceleration() {
        console.log(this.name + " Current speed increased into : " + this.setAcceleration() + " km/hrs");
        console.log("");
    }
    getBrake() {
        console.log(" Now the " +this.name + " bike speed is reduced to : " + this.setBrake() + " km/hrs"); 
        console.log("");
    }
    setDetails(){
        console.log("       THE BIKE DETAILS");
        this.getDetails();
        console.log("");
    }
}

class Bus extends Motor {
    constructor(id,mname,price,fuel,steering,speed) {
        super(id,mname,price,fuel,steering);
        this.speed = speed;
    }
    getAcceleration() {
        console.log(this.name + " Current speed increased into : " + this.setAcceleration() + " km/hrs");
        console.log("");
    }
    getBrake() {
        console.log(" Now the " +this.name + " bus speed is reduced to : " + this.setBrake() + " km/hrs"); 
        console.log("");
    }
    setDetails(){
        console.log("       THE BUS DETAILS");
        this.getDetails();
        console.log("");
    }
}

class Storage{
    static saveItems(carDetailsArray){
        localStorage.setItem("Items", JSON.stringify(carDetailsArray));
    }
    static getItems(id) {
        let items = JSON.parse(localStorage.getItem("Items"));
        return items.find(item => item.id === id);
    }
}

let car = new Car(1,"BMW M2","98Lakh","petrol","Electric",0);
let bike = new Bike(2, "FZ", "2Lakh", "petrol","Normal",0);
let bus = new Bus(3, "Ashok Leyland","25Lakh","Petrol","Automatic",0)
carDetailsArray.push(car);
carDetailsArray.push(bike);
carDetailsArray.push(bus);

//Store Item details in local Storage
Storage.saveItems(carDetailsArray);

//Calling the functions
car.setDetails();
car.getAcceleration();
car.getAcceleration();
bus.getAcceleration();
bike.getAcceleration();
car.getAcceleration();
car.getBrake();
bike.setDetails();
bus.getAcceleration();
bike.getAcceleration();
bus.getBrake();
bike.getAcceleration();
bike.getAcceleration();
bus.setDetails();
bike.getBrake();
bus.getAcceleration();
bus.getAcceleration();
console.log(carDetailsArray);
