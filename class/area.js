class Shape {
    constructor(radius){
        this.pi = 3.14;
        this.radius = radius;
        this.area = this.pi * this.radius * this.radius;
    }
    getArea(){
        return this.area;
    }
}

class Circle extends Shape {
    constructor(radius){
        super(radius);
    }
    showDimension(){
        console.log("The Area of a circle is:" + this.getArea().toFixed(2));
    }
}

let areaOfCircle = new Circle(20);
areaOfCircle.showDimension();