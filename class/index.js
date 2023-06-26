class Person {
    constructor(name,age,sex){
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    getVoiceType(){
        if(this.age < 50 && this.age > 18 && this.sex === "male"){
            return "hoarse";
        } else if (this.age < 50 && this.age >18 && this.sex === "female") {
            return "husky";
        } else {
            return "soft";
        }
    }
}

class Employee extends Person {
    constructor(id,name,age,sex){
        super(name,age,sex);
        this.id =id;
    }
}

let a = new Employee(1,"guru",25,"male");
let b = new Employee(2,"mala",5,"female");

//add place variable
Employee.prototype.place = "tenkasi";

//get methods
let voiceTypeofA = a.getVoiceType();
let voiceTypeofB = b.getVoiceType();

//output
console.log(voiceTypeofA);
console.log(voiceTypeofB);
console.log(a.place);

//check prototype

let checkPrototype = (a.prototype === b.prototype);
console.log(checkPrototype);



