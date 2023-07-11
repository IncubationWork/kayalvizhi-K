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

class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find(product => product.id === id);
  }

  static saveCart(cart,cartName) {
    localStorage.setItem(cartName, JSON.stringify(cart));
  }

  static getCart(cart) {
    return localStorage.getItem(cart) ? JSON.parse(localStorage.getItem(cart)) : [];
  }
}

export { ProductsModel, Storage };