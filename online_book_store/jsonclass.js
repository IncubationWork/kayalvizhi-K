class Product {
    constructor(image, title, author, price, quantity) {
      this.imageUrl = image;
      this.title = title;
      this.author = author;
      this.price = price;
      this.quantity = quantity;
    }
  }

  const productList = {
    products: [
        new Product('kayalvizhi.jpg','Kayalvizhi','Akilan',300,10),
            new Product('jalathebam.jpeg','Jalathebam','Sandilyan',400,10),
            new Product('kadalpura.jpeg','Kadal_Pura','Sandilyan',350,10),  
    ],
    render(){
        const prodContainer = document.getElementById('book_container');
        const prodList = document.createElement('ul');
        prodList.className = "product-list";
        for(const prod of this.products){
            const prodEl = document.createElement('li');
            prodEl.className = "product-item";
            prodEl.id = "product-item";
            prodEl.innerHTML = `
            <div class="b_image">
                <img src="images/${prod.imageUrl}" alt="kayalvizhi-book">
            </div>
            <div class="b_details">
                <h3 class="b_title">${prod.title}</h3>
                <h4 class="b_author">${prod.author}</h4>
                <p class="b_price">Rs. <span class="b_amount">${prod.price}</span>
                    </p>
                <p class="b_quantity">Qty: <span>${prod.quantity}</span>
                <span id="b_addcart" class="b_addcart">+</span> <span id="sold_out" class="hidden">Sold Out</span></p>
                
            </div>
            `;
            prodList.append(prodEl);
        }
        prodContainer.append(prodList);

    }

};
productList.render();

//add item to product

const addCart = document.querySelectorAll(".b_addcart");
const countOutline = document.getElementById('item_count');
let totalItem = 0, i = 0, qty = 1;
let shoparr = [];


    addCart.forEach((addBtn) => {
            addBtn.addEventListener("click",(e) => {
                let targetElement = e.target;
                let parentEle = targetElement.parentNode.firstElementChild;
                let lastpara = targetElement.parentNode;
                let amountNode = lastpara.previousElementSibling.firstElementChild.textContent;
                let author = lastpara.previousElementSibling.previousElementSibling.textContent;
                let title = lastpara.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
                let imagepath = lastpara.previousElementSibling.parentNode.previousElementSibling.firstElementChild;
                let bookurl = imagepath.getAttribute('src');
                let remainingItem = parentEle.textContent;
                countOutline.style.display="flex";
                if(+remainingItem === 0){
                    const soldOut = targetElement.parentNode.lastElementChild;
                    soldOut.classList.remove('hidden');
                    remainingItem = 0;
                } else {
                totalItem++;
                remainingItem--;
                parentEle.textContent = remainingItem;
                display(totalItem);
                addShopCart(bookurl,title,author,amountNode);
                }
            })
    });

function display(totalBItem){
    countOutline.textContent = totalBItem;
}

function addShopCart(imgUrl, title, author, amt){
    const disCart = document.getElementById("book_list");
    /*if(i === 0){
    shoparr.push({imageUrl: imgUrl,title:title,author:author,amount:amt});
    i++;
    }
    for(let arr of shoparr){
        let result = arr.title.includes(title);
        console.log(result)
        /*let arrIndex = arr.findIndex(x => x.title == title);
        console.log(arrIndex)*/
       /* if(result){
            /*qty++;
            let index = shoparr.findIndex(x => x.title === title);*/
            

       /* } else {
            shoparr.push({imageUrl: imgUrl,title:title,author:author,amount:amt});
        }
        
    }*/
    const li = document.createElement(li);
    disCart.append(li);
    li.innerHTML = `
    <div class="shop_title">${title}</div>
    <div class="shop_quantity">${qty}</div>
    `;

}

/*const displayCart = document.createElement('div');
    displayCart.className = "display_cart";
    displayCart.id ="display_cart";
    displayCart.innerHTML = `
    <h2> Shopping Cart </h2>
    <div class="close" id="close"></div>
    <div class="book_details">
        <ul id="book_list">
        </ul>
    </div>
    `;*/


  /*class ProductItem extends Product{
    product = [];
    constructor(){
        super();
        this.render();
        this.fetchItem();
    }
    fetchItem() {
        this.products=[
            new Product('kayalvizhi.jpg','Kayalvizhi','Akilan',300,10),
            new Product('jalathebam.jpg','Jalathebam','Sandilyan',400,10),
            new Product('kadalpura.jpg','Kadal_Pura','Sandilyan',350,10),
            new Product('kadalrani.jpg','Kadal_Rani','Sandilyan',200,10),
          ];
    }
    render(){
        const bookCon = document.getElementById('book_container');
        const ul = document.createElement('ul');
        ul.className = "prod_list";
        for(const prod of products){
            console.log(prod);
        }
    }
} 
const prodlist = new ProductItem();
prodlist.render();*/




    
   