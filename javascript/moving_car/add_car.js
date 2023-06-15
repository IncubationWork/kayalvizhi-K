class Car{
    constructor(name,number,imageUrl){
        this.name = name;
        this.number = number;
        this.imageUrl = imageUrl;
    }
}
const carList ={
    cars: [
        new Car('blue','TN76K9876','Img_05.png'),
    ],

    addCarList() {
        const carContainer = document.getElementById('car');
        const ul = document.createElement('ul');
        ul.className = 'car_list';
        for (const car of this.cars){
            const li = document.createElement('li');
            li.className = 'car-item';
            li.innerHTML = `
            <div class="car-num">${car.number}</div>
                <img src="images/${car.imageUrl}" class=".anim_car">
                `;
            ul.append(li);
        }
        carContainer.append(ul);
    }
}

carList.addCarList();