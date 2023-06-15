/*const carBtn = document.getElementById('control');
const carContainer = document.getElementById('car');
console.log(carBtn);

const addAnim = () => {
    console.log("button clicked");
    carContainer.classList.toggle("whole-car");
    if(carBtn.textContent === "Start"){
        carBtn.textContent = "Stop";   
    } else {
    carBtn.textContent = "Start";
    }
}

carBtn.addEventListener('click', addAnim)*/
const carContainer = document.getElementById('car');

const jstoggle = document.getElementById('control');
jstoggle.addEventListener('click', () => {
  const animations = document.querySelectorAll('[data-animation');
  animations.forEach(animation => {
    const running = getComputedStyle(animation).getPropertyValue("--animps") || 'running';
    animation.style.setProperty('--animps', running === 'running' ? 'paused' : 'running');
  })
  if(jstoggle.textContent === "Start"){
    jstoggle.textContent = "Stop";  
    console.log(carContainer.offsetLeft); 
} else {
    jstoggle.textContent = "Start";
    console.log(carContainer.offsetLeft);
}
});
 
const positionCar = carContainer.offsetLeft;

if(positionCar === 1096){
    carContainer.style.display = 'none';
}
