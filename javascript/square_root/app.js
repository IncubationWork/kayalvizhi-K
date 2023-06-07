const userNumberInput = document.getElementById('even');
const checkButton = document.querySelector('.btn-even');
const clearButton = document.querySelector('.clear');
const evenNumberContainer = document.getElementById('result');

const displayEvenNumber = () => {

    const paraTag = document.querySelectorAll('.even-number');
    paraTag.forEach((button) => {
        button.parentNode.remove();
    });
    evenNumberContainer.style.display = "none";
    const givenNumber = userNumberInput.value;
    let i = 0;
    let sum = 0;
    if(givenNumber.trim() === '') {
        alert("Give a Valid Numbers");
    } else {
        evenNumberContainer.style.display = "block";
        let a = [];
        a=givenNumber.split(',');
        const numString = a.map(Number);
        const finalResult = numString.map(Number => Number*Number);
        console.log(finalResult);
        const task = `<div class="task">
                <p class="even-number">${finalResult}</p>
                </div>`;
        evenNumberContainer.insertAdjacentHTML("beforeend",task);
    }
}

const clearInput = () => {
    userNumberInput.value = '';
    const paraTag = document.querySelectorAll('.even-number');
    paraTag.forEach((button) => {
        button.parentNode.remove();
    });
    evenNumberContainer.style.display = "none";
}

checkButton.addEventListener('click', displayEvenNumber);
clearButton.addEventListener('click', clearInput);