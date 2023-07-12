import { ProductsModel, Storage } from './product.js';

let userCartName = '';

class UI {
  constructor() {
    this.productsDOM = document.querySelector(".products-center");
  }
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
      this.productsDOM.innerHTML = result;     
  }
}

class CartView {
    constructor(){
        this.clearCartBtn = document.querySelector(".clear-cart");
        this.cartContent = document.querySelector(".cart-content");
        this.cartBtn = document.querySelector(".nav-cart");
        this.closeCartBtn = document.querySelector(".close-cart");
        this.cartItems = document.querySelector(".cart-items");
        this.cartTotal = document.querySelector(".cart-total");
        this.cartDOM = document.querySelector(".cart");
        this.cartOverlay = document.querySelector(".cart-overlay");
        this.cart = [];
        this.buttonDOM = [];
    }
    getBagButtons(){
        const buttons = [...document.querySelectorAll(".bag-btn")];
        this.buttonDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = this.cart.find(item => item.id === id);
            if(inCart) {
                button.innerText = "In Cart";
                button.disabled = true;
            }
                button.addEventListener("click", event => {
                    event.target.innerText = "In Cart";
                    event.target.disabled = true;
                    let cartItem = {...Storage.getProduct(id),amount: 1};
                    console.log(this.cart);
                    this.cart = [...this.cart,cartItem];
                    console.log(userCartName);
                    Storage.saveCart(this.cart,userCartName);
                    this.setCartValues(this.cart);
                    this.addCartItem(cartItem);
                })
        })
    }
    setupAPP(cartName){
        userCartName = cartName;
        this.cart = Storage.getCart(cartName);
        this.setCartValues(this.cart);
        this.populateCart(this.cart);
        this.cartBtn.addEventListener('click',this.showCart.bind(this));
        this.closeCartBtn.addEventListener('click',this.hideCart.bind(this));
    }
    setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        })
        this.cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        this.cartItems.innerText = itemsTotal;
    }
    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }
    showCart() {
        this.cartOverlay.classList.add("transparentBcg");
        this.cartDOM.classList.add("showCart");
    }
    hideCart(){
        this.cartOverlay.classList.remove("transparentBcg");
        this.cartDOM.classList.remove("showCart");
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
        this.cartContent.appendChild(div);
        const p = document.createElement('p');
        p.classList.add('error');
        p.classList.add('dis');
        this.cartContent.appendChild(p);
  
    }
    cartLogic(){
        // clearCartBtn.addEventListener("click",this.clearCart)//clear cart button
         this.clearCartBtn.addEventListener("click",() => {
             this.clearCart();
         })
         //cart functionality
         this.cartContent.addEventListener("click", event => {
             if(event.target.classList.contains("remove-item"))
             {
                 let removeItem = event.target;
                 let id = removeItem.dataset.id;
                 console.log(id);
                 this.cartContent.removeChild(removeItem.parentElement.parentElement);
                 this.removeItem(id);
             } else if (event.target.classList.contains("fa-chevron-up")){
                 let addAmount = event.target;
                 let error = event.target.parentElement.parentElement.nextElementSibling;
                 let id = addAmount.dataset.id;
                 let tempItem = this.cart.find(item => item.id === id);
             
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
                 Storage.saveCart(this.cart,userCartName);
                 this.setCartValues(this.cart);
                 addAmount.nextElementSibling.innerText = tempItem.amount;
             } else if (event.target.classList.contains("fa-chevron-down")){
                 let lowerAmount = event.target;
                 let id = lowerAmount.dataset.id;
                 
                 let tempItem = this.cart.find(item => item.id === id);
                 tempItem.amount = tempItem.amount - 1;
             
                 if(tempItem.amount > 0){
                     Storage.saveCart(this.cart,userCartName);
                     this.setCartValues(this.cart);
                     lowerAmount.parentElement.firstElementChild.nextElementSibling.textContent =tempItem.amount;
                     //lowerAmount.previouElementSibling.textContent = tempItem.amount;
                 } else {
                     this.cartContent.removeChild(lowerAmount.parentElement.parentElement);
                     this.removeItem(id);
                 }
             }
         })
     }
     clearCart(){
        this.cartQuantityDetails();
        //remove item from cart
        let cartItems = this.cart.map(item => item.id);
        cartItems.forEach((id) => {
            this.removeItem(id);
        });
        this.cartContent.innerHTML = '';  
  
    }
    removeItem(id){
        this.cart = this.cart.filter(item => item.id !== id);
        this.setCartValues(this.cart);
        Storage.saveCart(this.cart,userCartName);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
    }
    getSingleButton(id) {
        return this.buttonDOM.find(button => button.dataset.id === id);
    }
    cartQuantityDetails() {
        //Reduce quantity from product
        let productItems = JSON.parse(localStorage.getItem("products"));
        const soldOut = document.querySelectorAll("#soldout");
        const btn = document.querySelectorAll(".bag-btn");
        
        this.cart.forEach((cartItem) => {
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
    updateProductQtyInHtml(prodID, quantity) {
        const productsQuantity = document.querySelectorAll(".qty");
        productsQuantity.forEach((qtyElement) => {
            const elementProductId = qtyElement.getAttribute('data-id');
            if(elementProductId === prodID) {
                qtyElement.textContent = quantity;
            }
        })
    }
}

export { UI, CartView };

