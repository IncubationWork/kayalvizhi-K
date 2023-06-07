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

    const numString = userNumberInput.value;
    const givenNumber = +userNumberInput.value;
    let i = 0;
    let sum = 0;
    if(givenNumber <= 0) {
        alert("Give a Positive number");
    } else {
        evenNumberContainer.style.display = "block";
        while( i<numString.length ) {
            sum = sum + +numString[i];
            i++;
        }
        const task = `<div class="task">
                <p class="even-number">${sum}</p>
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