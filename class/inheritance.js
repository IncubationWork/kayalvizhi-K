class Shape {
    constructor() {
        try {
            throw "You cannot create any abstract Shapes";
        } catch(err) {
            console.log(err);
        }
    }
    getAreaofCircle(radius) {
        return Math.PI * this.radius * this.radius;
    }
    getAreaofRectangle(length, height) {
        return (this.length * this.height)/2;
    }
    calculateValueOfS(a,b,c) {
        return (this.a + this.b + this.c)/2;
    }
    getAreaofTriangle(s,a,b,c) {
        return Math.sqrt(this.s * (this.s - this.a) * (this.s - this.b) * (this.s - this.c));
    }
    getTotalSides(shape) {
        this.shape = shape;
        if(this.shape === "circle") {
            console.log("Circle has no sides");
        }
        else if(this.shape === "triangle") {
            this.total = this.a + this.b + this.c;
            console.log("Triangle has three sides, total of its sides are : " + this.total);
        } else if(this.shape === "rectangle") {
            this.total = (this.length * 2) + (this.height * 2);
            console.log("Rectangle has four sides, total of its sides are : " + this.total);
        }
    }
    getDimensions(shape) {
        console.log(this.shape + " has two dimensions");
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius =radius;
    }
    showArea() {
        console.log("The Area of a circle is:" + this.getAreaofCircle(this.radious).toFixed(2));
    }
}

class Rectangle extends Shape {
    constructor(length,height) {
        super();
        this.length = length;
        this.height = height;
    }
    showArea(){
        console.log("The Area of a Rectangle is:" + this.getAreaofRectangle(this.length,this.height));
    }
}

class Triangle extends Shape {
    constructor(a,b,c) {
        super();
        this.a = a;
        this.b = b;
        this.c = c;
    }
    showArea(){
        this.s = this.calculateValueOfS(this.a,this.b,this.c);
        console.log("The Area of a Triangle is:" + this.getAreaofTriangle(this.s,this.a,this.b,this.c).toFixed(2));
    }
}

//creating instance for class circle

let circle = new Circle(20);
circle.showArea();
circle.getTotalSides("circle");
circle.getDimensions("circle");

//creating instance for class rectangle

let rec = new Rectangle(30,20);
rec.showArea();
rec.getTotalSides("rectangle");

//creating instance for class triangle

let tri = new Triangle(5,6,8);
tri.showArea();
tri.getTotalSides("triangle");