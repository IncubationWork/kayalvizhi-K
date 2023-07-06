class ProductsModel {
  async getProducts() {
    try {
      let result = await fetch('products.json');
      let data = await result.json();

      let products = data.items;
      products = products.map(item => {
        const { title, author, price, quantity } = item.fields;
        const { id } = item.sys;

        const image = item.fields.image.fields.file.url;
        return { title, author, price, quantity, id, image }
      })
      return products;

    } catch (error) {
      console.log(error);
    }
  }
}

class CartModel {
  constructor() {
    this.cart = [];
  }

  getCart() {
    return this.cart;
  }

  setCart(cart) {
    this.cart = cart;
  }

  addToCart(item) {
    this.cart = [...this.cart, item];
  }

  removeFromCart(id) {
    this.cart = this.cart.filter(item => item.id !== id);
  }
}

class StorageModel {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find(product => product.id === id);
  }

  static saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  static getCart() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  }
}

