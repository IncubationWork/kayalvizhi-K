const cartBtn = document.querySelector(".cart div:last-child");
const shopcartDisplay = document.getElementById("display_cart");
const closeBtn = document.getElementById("close");

const cartDisplay = () => {
        shopcartDisplay.style.transform = "translateX(0)";
}

const closeCart = () => {
    shopcartDisplay.style.transform = "translateX(100%)";
}

cartBtn.addEventListener("click", cartDisplay);
closeBtn.addEventListener("click", closeCart);