const div1 = document.querySelector('.div1');
const div2 = document.querySelector('.div2');
const div3 = document.querySelector('.div3');
const carDetails = document.querySelector('.car_details');
const bikeDetails = document.querySelector('.bike_details');
const busDetails = document.querySelector('.bus_details');

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
}

class Car extends Motor {
    constructor(id,mname,price,fuel,steering,speed) {
        super(id,mname,price,fuel,steering);
        this.speed = speed;
    }
    getAcceleration() {
        if(this.speed >= 250) {
            carDetails.innerHTML = "Maximum speed Reached.";
        } else {
            carDetails.innerHTML = this.name + " Current speed increased into : " + this.setAcceleration() + " km/hrs"; 
        }
    }
    getBrake() {
        if(this.speed === 0) {
            carDetails.innerHTML = "Now the vehicle is not moving, Kindly release the brake";
        } else {
            carDetails.innerHTML = "Now the " +this.name + " car speed is reduced to : " + this.setBrake() + " km/hrs"; 
        }
    }

    setDetails(){
        let carDetail = `
        <h1>Car</h1>
        <p>Model : <span> ${this.name}</span> <br>
        Price : <span>Rs. ${this.price} </span><br>
        Fuel Type : <span>${this.type}</span><br>
        Steering : <span>${this.steering}</span></p>
        <button onclick="car.getAcceleration()">Accelerate</button>
        <button onclick="car.getBrake()">Brake</button>
        `;
        div1.insertAdjacentHTML("afterbegin",carDetail);
    }
}

class Bike extends Motor {
    constructor(id,mname,price,fuel,steering,speed) {
        super(id,mname,price,fuel,steering);
        this.speed = speed;
    }
    getAcceleration() {
        if(this.speed >= 110) {
            bikeDetails.innerHTML = "Maximum speed Reached.";
        } else {
            bikeDetails.innerHTML = this.name + " Current speed increased into : " + this.setAcceleration() + " km/hrs"; 
        }
    }
    getBrake() {
        if(this.speed === 0) {
            bikeDetails.innerHTML = "Now the vehicle is not moving, Kindly release the brake";
        } else {
            bikeDetails.innerHTML = "Now the " +this.name + " bike speed is reduced to : " + this.setBrake() + " km/hrs"; 
        }
    }

    setDetails(){
        let carDetail = `
        <h1>Bike</h1>
        <p>Model : <span> ${this.name}</span> <br>
        Price : <span>Rs. ${this.price} </span><br>
        Fuel Type : <span>${this.type}</span><br>
        Steering : <span>${this.steering}</span></p>
        <button onclick="bike.getAcceleration()">Accelerate</button>
        <button onclick="bike.getBrake()">Brake</button>
        `;
        div2.insertAdjacentHTML("afterbegin",carDetail);
    }
}

class Bus extends Motor {
    constructor(id,mname,price,fuel,steering,speed) {
        super(id,mname,price,fuel,steering);
        this.speed = speed;
    }
    getAcceleration() {
        if(this.speed >= 120) {
            busDetails.innerHTML = "Maximum speed Reached.";
        } else {
            busDetails.innerHTML = this.name + " Current speed increased into : " + this.setAcceleration() + " km/hrs"; 
        } 
    }
    getBrake() {
        if(this.speed === 0) {
            busDetails.innerHTML = "Now the vehicle is not moving, Kindly release the brake";
        } else {
            busDetails.innerHTML = "Now the " +this.name + " bus speed is reduced to : " + this.setBrake() + " km/hrs"; 
        } 
    }

    setDetails(){
        let carDetail = `
        <h1>Bus</h1>
        <p>Model : <span> ${this.name}</span> <br>
        Price : <span>Rs. ${this.price} </span><br>
        Fuel Type : <span>${this.type}</span><br>
        Steering : <span>${this.steering}</span></p>
        <button onclick="bus.getAcceleration()">Accelerate</button>
        <button onclick="bus.getBrake()">Brake</button>
        `;
        div3.insertAdjacentHTML("afterbegin",carDetail);
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
bike.setDetails();
bus.setDetails();


