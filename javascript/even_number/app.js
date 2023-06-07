const userNumberInput = document.getElementById('even');
const checkButton = document.querySelector('.btn-even');
const clearButton = document.querySelector('.clear');
const evenNumberContainer = document.getElementById('result');

const displayEvenNumber = () => {
    const givenNumber = +userNumberInput.value;
    let i = 0;
    if(givenNumber <= 0) {
        alert("Give a Positive number");
    } else {
        evenNumberContainer.style.display = "block";
        for(;i <= givenNumber; i++) {
            if(i%2 === 0) {
                const task = `<div class="task">
                <p class="even-number">${i}</p>
                </div>`;
                evenNumberContainer.insertAdjacentHTML("beforeend",task);
            }
        }
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