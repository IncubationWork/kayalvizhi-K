const wrapper = document.getElementById('wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('header i');
const bannerBox = document.querySelector('.banner');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
})

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
})

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
    bannerBox.classList.add('banner-disable');
    wrapper.style.display = "flex";
})

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    bannerBox.classList.remove('banner-disable');
    wrapper.style.display = "none";
    
})