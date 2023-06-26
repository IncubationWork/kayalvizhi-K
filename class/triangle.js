class Shape {
    constructor(a,b,c){
        this.pi = 3.14;
        this.radius = radius;
        this.area = this.pi * this.radius * this.radius;
    }
    getArea(){
        return this.area;
    }
}

class Triangle extends Shape {
    constructor(radius){
        super(radius);
    }
    showDimension(){
        console.log("The Area of a circle is:" + this.getArea().toFixed(2));
    }
}

let areaOfCircle = new Triangle(20);
areaOfCircle.showDimension();