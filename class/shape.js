class Shape {
    constructor(length,height){
        this.lengthsqr = length * length;
        this.heightsqr = height * height;
        this.dimension = Math.sqrt(this.lengthsqr * this.heightsqr);
    }
    getDimension(){
        return this.dimension;
    }
}

class Rectangle extends Shape {
    constructor(length, height){
        super(length,height);
    }
    showDimension(){
        console.log("The Dimension of a Rectangle is:" + this.getDimension().toFixed(2));
    }
}

let areaOfTriangle = new Rectangle(10,20);
areaOfTriangle.showDimension();