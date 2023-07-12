import { ProductsModel, Storage } from './product.js';
import { UI, CartView } from './ui.js';


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


const regUser = document.querySelector('#reg-btn');
const regName = document.getElementById('reg-name');
const regEmail = document.getElementById('reg-email');
const regPass = document.getElementById('reg-password');
const logUser = document.querySelector('#log-btn');
const logEmail = document.getElementById('log-email');
const logPass = document.getElementById('log-password');
const loginBtn = document.getElementById('navigation');
const logoutBtn = document.getElementById('navigationLog');
const cartImg = document.getElementById('nav-icon');
const iElem = cartImg.getElementsByTagName('i')[0];
const cartCount = document.getElementById('cart-items');
const wrapper = document.getElementById('wrapper');
const bannerBox = document.querySelector('.banner');
const userName = document.getElementById('userName');
const changeName = document.querySelector('.changeName');

let user_records=new Array();
let loginVerification = false;
logoutBtn.style.display = "none";
userName.style.display = "none";

const register = () => {
    
    user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[];

    if(user_records.some((v)=>{return v.email==regEmail.value})) {
        alert("duplicate data");
    }
    else {
        user_records.push({
            "name":regName.value,
            "email":regEmail.value,
            "psw":regPass.value
        })
        localStorage.setItem("users",JSON.stringify(user_records));
    }
    regName.value = "";
    regEmail.value = "";
    regPass.value = "";

}

let nameUser = '';
let userNameDisplay = '';

const login = () => {
    user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
    if(user_records.some((v)=>{return v.email==logEmail.value && v.psw==logPass.value})) {

        let current_user=user_records.filter((v)=>{return v.email==logEmail.value && v.psw==logPass.value})[0]
        nameUser = current_user.email;
        userNameDisplay = current_user.name;
        loginVerification = true;

        if(localStorage.getItem(nameUser) !== null) {
            cartView.setupAPP(nameUser);
        } else {
            localStorage.setItem(nameUser, JSON.stringify([]));
            cartView.setupAPP(nameUser);
        }

        userName.style.display = "block";
        changeName.textContent = userNameDisplay;
        loginBtn.style.display = "none";
        logoutBtn.style.display = "flex";
        iElem.style.display = "flex";
        cartCount.style.display = "block";
        wrapper.classList.remove('active-popup');
        bannerBox.classList.remove('banner-disable');
        wrapper.style.display = "none";
    }
    else {
        alert('Login Fail');
    }
}

const logout = () => {
    loginBtn.style.display = "flex";
        logoutBtn.style.display = "none";
        iElem.style.display = "none";
        cartCount.style.display = "none";
        loginVerification = false;
        userName.style.display = "none";
}

regUser.addEventListener("click",register);
logUser.addEventListener("click",login);
logoutBtn.addEventListener("click",logout);



