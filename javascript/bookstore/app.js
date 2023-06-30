const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

//cart
let cart = [];
//buttons
let buttonDOM = [];


//getting the products
class Products{
    async getProducts(){
        try{
            let result = await fetch('products.json');
            let data = await result.json();

            let products = data.items;
            products = products.map(item => {
                const {title,author,price,quantity} = item.fields;
                const {id} = item.sys;

                const image = item.fields.image.fields.file.url;
                return {title,author,price,quantity,id,image}
            })
            return products;

        } catch (error) {
            console.log(error);
        }
    }

}
//display products
class UI {
    displayProducts(products){
        let result = '';
        products.forEach(product => {
            result += `
            <article class="product">
                <div class="img-container">
                     <img src=${product.image} 
                    alt="product" class="product-img">
                    <button class="bag-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        add to cart
                    </button>
                </div>
                <h3>${product.title}</h3>
                <h4>Author: ${product.author}</h4>
                <h4>Quantity: <span class="qty" data-id=${product.id}>${product.quantity}</span></h4>
                <h4>Rs.${product.price}</h4> 
                <span id="soldout" class="soldout dis" data-id=${product.id}>Sold Out</span>
            </article>
            `;
        });
        productsDOM.innerHTML = result;     
    }
    getBagButtons(){
        const buttons = [...document.querySelectorAll(".bag-btn")];
        buttonDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if(inCart) {
                button.innerText = "In Cart";
                button.disabled = true;
            }
                button.addEventListener("click", event => {
                    event.target.innerText = "In Cart";
                    event.target.disabled = true;
                    //get product from products(local storage)
                    let cartItem = {...Storage.getProduct(id),amount: 1};
                    //add product to the cart
                    cart = [...cart,cartItem];
                    //save cart in local storage
                    Storage.saveCart(cart);
                    //set cart values
                    this.setCartValues(cart);
                    //display cart item
                    this.addCartItem(cartItem);
                    //show the cart
                    //this.showCart();
                })
        })
    }
    setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }
    addCartItem(item){
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
        <img src=${item.image} alt="product">
        <div>
            <h4>${item.title}</h4>
            <h5>Rs. ${item.price}</h5>
            <span class="remove-item" 
            data-id=${item.id}>remove</span>
        </div>
        <div>
            <i class="fas fa-chevron-up" data-id=${item.id}></i>
            <p class="item-amount">${item.amount}</p>
            <i class="fas fa-chevron-down" data-id=${item.id}></i>
        </div>
        `;
        cartContent.appendChild(div);
        const p = document.createElement('p');
        p.classList.add('error');
        p.classList.add('dis');
        cartContent.appendChild(p);
  
    }
    showCart() {
        cartOverlay.classList.add("transparentBcg");
        cartDOM.classList.add("showCart");
    }
    setupAPP(){
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click',this.showCart);
        closeCartBtn.addEventListener('click',this.hideCart);
    }
    populateCart(cart){
        cart.forEach(item => this.addCartItem(item));
    }
    hideCart(){
        cartOverlay.classList.remove("transparentBcg");
        cartDOM.classList.remove("showCart");
    }
    cartLogic(){
       // clearCartBtn.addEventListener("click",this.clearCart)//clear cart button
        clearCartBtn.addEventListener("click",() => {
            this.clearCart();
        })
        //cart functionality
        cartContent.addEventListener("click", event => {
            if(event.target.classList.contains("remove-item"))
            {
                let removeItem = event.target;
                //let error = event.target.parentElement.parentElement.nextElementSibling;
                //error.classList.add('dis');
                let id = removeItem.dataset.id;
                console.log(id);
                cartContent.removeChild(removeItem.parentElement.parentElement);
                this.removeItem(id);
            } else if (event.target.classList.contains("fa-chevron-up")){
                let addAmount = event.target;
                let error = event.target.parentElement.parentElement.nextElementSibling;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
            
                //get product quantity from localStorage
                let productItems = JSON.parse(localStorage.getItem("products"));
                productItems.forEach((prodItem) => {
                    if(prodItem.id === id) {
                        const {quantity} = prodItem;
                        if(tempItem.amount < quantity) {
                            tempItem.amount = tempItem.amount + 1;
                        } else {
                            error.classList.remove('dis');
                            error.innerText = `! Only ${quantity} item(s) left.`;
                            tempItem.amount = tempItem.amount;

                            const displayDuration = 2000;
                            setTimeout(() => {
                                error.classList.add('dis');
                            }, displayDuration)
                        }
                    } 
                })
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;
            } else if (event.target.classList.contains("fa-chevron-down")){
                let lowerAmount = event.target;
                
                //let error = event.target.parentElement.parentElement.nextElementSibling;
                //error.classList.add('dis');
                let id = lowerAmount.dataset.id;
                
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount - 1;
            
                if(tempItem.amount > 0){
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    lowerAmount.parentElement.firstElementChild.nextElementSibling.textContent =tempItem.amount;
                    //lowerAmount.previouElementSibling.textContent = tempItem.amount;
                } else {
                    cartContent.removeChild(lowerAmount.parentElement.parentElement);
                    this.removeItem(id);
                }
            }
        })
    }
    updateProductQtyInHtml(prodID, quantity) {
        const productsQuantity = document.querySelectorAll(".qty");
        productsQuantity.forEach((qtyElement) => {
            const elementProductId = qtyElement.getAttribute('data-id');
            if(elementProductId === prodID) {
                qtyElement.textContent = quantity;
            }
        })
    }

    //get cart quantity details
    cartQuantityDetails() {
        //Reduce quantity from product
        let productItems = JSON.parse(localStorage.getItem("products"));
        const soldOut = document.querySelectorAll("#soldout");
        const btn = document.querySelectorAll(".bag-btn");
        
        cart.forEach((cartItem) => {
            const {id, amount} = cartItem;
            const productIndex = productItems.findIndex(product => product.id === id);
        
            if(productIndex !== -1) {
                productItems[productIndex].quantity = productItems[productIndex].quantity - amount;

                //check if the product is available
                if (productItems[productIndex].quantity === 0) {
                    soldOut.forEach((soldElement) => {
                        const elementProductId = soldElement.getAttribute('data-id');
                        if(elementProductId === productItems[productIndex].id) {
                            soldElement.style.display = "block";
                            //get corresponding button & disable add cart button
                            btn.forEach((btnElement) => {
                                const btnProdId = btnElement.getAttribute('data-id');
                                if(btnProdId === productItems[productIndex].id) {
                                    btnElement.style.display = "none";
                                }
                            })
                        }
                    })
                }

                //modify quantity in html
                this.updateProductQtyInHtml(productItems[productIndex].id,productItems[productIndex].quantity);
                Storage.saveProducts(productItems);
            }
        });
    }

    clearCart(){
        this.cartQuantityDetails();
        //remove item from cart
        let cartItems = cart.map(item => item.id);
        cartItems.forEach((id) => {
            this.removeItem(id);
        });
        cartContent.innerHTML = '';  

    }
    removeItem(id){
        cart = cart.filter(item => item.id !== id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
    }
    getSingleButton(id) {
        return buttonDOM.find(button => button.dataset.id === id);
    }
}
//local storage
class Storage{
    static saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id);
    }
    static saveCart(cart){
        localStorage.setItem('cart',JSON.stringify(cart));
    }
    static getCart(){
        return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    //setup app
    ui.setupAPP();
    //get all products
    products.getProducts().then(products => {
        ui.displayProducts(products);
    Storage.saveProducts(products);
    }).then(() => {
        ui.getBagButtons();
        ui.cartLogic();
    });
});


//add or subtract quantity based on cart
//display sold out if the quantity is zero


