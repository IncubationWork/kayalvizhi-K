class Controller {
  constructor(productsModel, ui, cartView) {
    this.productsModel = productsModel;
    this.ui = ui;
    this.cartView = cartView;
    this.loadProducts();
  }

  loadProducts() {
    this.cartView.setupAPP();
    this.productsModel.getProducts().then(products => {
      this.ui.displayProducts(products);
      Storage.saveProducts(products);
    }).then(() => {
      this.cartView.getBagButtons();
      this.cartView.cartLogic();
  });
  }
}

const ui = new UI();
const productsModel = new ProductsModel();
const cartView = new CartView();
const controller = new Controller(productsModel, ui, cartView);

