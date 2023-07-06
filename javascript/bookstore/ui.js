class ProductsView {
  constructor() {
    this.productsDOM = document.querySelector(".products-center");
  }

  displayProducts(products) {
    let result = '';
    products.forEach(product => {
      result += `
      <article class="product">
        <div class="img-container">
          <img src=${product.image} alt="product" class="product-img">
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

  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttons.forEach(button => {
      let id = button.dataset.id;
      button.addEventListener("click", () => {
        this.addToCart(id);
      });
    });
  }

  addToCart(id) {
    const event = new CustomEvent('addToCart', { detail: id });
    document.dispatchEvent(event);
  }
}

class CartView {
  constructor() {
    this.cartDOM = document.querySelector(".cart");
    this.cartOverlay = document.querySelector(".cart-overlay");
    this.cartItems = document.querySelector(".cart-items");
    this.cartTotal = document.querySelector(".cart-total");
    this.cartContent = document.querySelector(".cart-content");
    this.closeCartBtn = document.querySelector(".close-cart");
    this.clearCartBtn = document.querySelector(".clear-cart");
    this.buttonDOM = [];
  }

    setCartValues(total, items) {
    this.cartTotal.innerText = parseFloat(total.toFixed(2));
    this.cartItems.innerText = items;
  }

  // ...
}

