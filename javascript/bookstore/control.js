class Controller {
  constructor(productsModel, cartModel, productsView, cartView) {
    this.productsModel = productsModel;
    this.cartModel = cartModel;
    this.productsView = productsView;
    this.cartView = cartView;

    this.initialize();
  }

  initialize() {
    this.loadProducts();
    this.bindEvents();
    this.cartView.setupAPP();
  }

  loadProducts() {
    this.productsModel.getProducts()
      .then(products => {
        this.productsModel.setProducts(products);
        this.productsView.displayProducts(products);
        Storage.saveProducts(products);
      })
      .then(() => {
        this.productsView.getBagButtons();
        this.cartView.cartLogic();
      });
  }

  bindEvents() {
    document.addEventListener('addToCart', event => {
      const productId = event.detail;
      const product = Storage.getProduct(productId);
      this.cartModel.addToCart(product);
      Storage.saveCart(this.cartModel.getCart());
      this.cartView.addCartItem(product);
      this.cartView.setCartValues(this.cartModel.getTotalPrice(), this.cartModel.getTotalItems());
      this.cartView.showCart();
    });

    this.cartView.closeCartBtn.addEventListener('click', () => {
      this.cartView.hideCart();
    });

    this.cartView.clearCartBtn.addEventListener('click', () => {
      this.cartModel.clearCart();
      Storage.saveCart(this.cartModel.getCart());
      this.cartView.clearCart();
    });
  }
}

const productsModel = new ProductsModel();
const cartModel = new CartModel();
const productsView = new ProductsView();
const cartView = new CartView();

const controller = new Controller(productsModel, cartModel, productsView, cartView);

