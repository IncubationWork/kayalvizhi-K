const mainContainer = document.getElementById("container");

function createHeader(){
//create Header tag
const headerDiv = document.createElement('div');
headerDiv.className = "header";
//create Header Item - title
/*const headItem = document.createElement('div');
headItem.className = "title";
headItem.textContent = "Online Book Store";*/
headerDiv.innerHTML = `
<div class="title">
    Online Book Store
</div>
<div class="cart">
<div class="item_count hidden" id="item_count">0</div>
<div class="img-cart">
cart
</div>
</div>
`;
mainContainer.append(headerDiv);
}

function shoppingCart(){
    //create cart window
    const displayCart = document.createElement('div');
    displayCart.className = "display_cart";
    displayCart.id ="display_cart";
    displayCart.innerHTML = `
    <h2> Shopping Cart </h2>
    <div class="close" id="close"></div>
    <div class="book_details">
        <ul id="book_list">
        </ul>
    </div>
    `;
    mainContainer.append(displayCart);
}



createHeader();
shoppingCart();
//localStorage.setItem("Data", mainContainer.innerHTML);
//console.log(mainContainer.innerHTML = localStorage.getItem(Data));