const regUser = document.querySelector('#reg-btn');
const regName = document.getElementById('reg-name');
const regEmail = document.getElementById('reg-email');
const regPass = document.getElementById('reg-password');
const logUser = document.querySelector('#log-btn');
const logEmail = document.getElementById('log-email');
const logPass = document.getElementById('log-password');
const loginBtn = document.getElementById('navigation');
const cartImg = document.getElementById('nav-icon');
const iElem = cartImg.getElementsByTagName('i')[0];
const cartCount = document.getElementById('cart-items');
console.log(iElem);
console.log(cartCount);
console.log(logPass);
let user_records=new Array();

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

const login = () => {
    user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
    if(user_records.some((v)=>{return v.email==logEmail.value && v.psw==logPass.value})) {
        alert("Login Pass");
        let current_user=user_records.filter((v)=>{return v.email==logEmail.value && v.psw==logPass.value})[0]
        console.log(loginBtn);
        //localStorage.setItem('name',current_user.name);
        //localStorage.setItem('email',current_user.email);
        loginBtn.style.display = "none";
        iElem.style.display = "flex";
        cartCount.style.display = "block";
    }
    else {
        alert('Login Fail');
    }
}

regUser.addEventListener("click",register);
logUser.addEventListener("click",login);

