const userNameInput = document.getElementById('name');
const userAgeInput = document.getElementById('age');
const checkButton = document.querySelector('div button');
const eligibleButton = document.getElementById('eligible');
const clearButton = document.querySelector('.clear');

const checkEligible = () => {
    eligibleButton.style.display = 'none';
    const userName = userNameInput.value;
    const userAge = userAgeInput.value;

    const styleFun = () => {
        eligibleButton.style.color = 'white';
        eligibleButton.style.fontWeight = 600;
        eligibleButton.style.border = 'none';
        eligibleButton.style.fontSize = '15px';
        eligibleButton.style.display = 'block';
    }

    if(userName.trim() === '' ||
    userAge.trim() === '' ||
    userAge <= 0){
        alert("Give a valid input (Name cannot be empty and Age should be in positive number)");
    } else if(+userAge < 18) {
        eligibleButton.textContent='Not Eligible';
        eligibleButton.style.backgroundColor = 'red';
        styleFun();
        
        //eligibleButton.classList.toggle("not-eligible-display");
    } else {
        eligibleButton.textContent='Eligible';
        eligibleButton.style.backgroundColor = 'green';
        styleFun();
        //eligibleButton.classList.toggle("eligible-display");
    }
};

const disableButton = () => {
    eligibleButton.style.display = 'none';
}

const clearInput = () => {
    userNameInput.value = '';
    userAgeInput.value = '';
    eligibleButton.style.display = 'none';
}

checkButton.addEventListener('click', checkEligible );
userNameInput.addEventListener('click', disableButton);
userAgeInput.addEventListener('click', disableButton);
clearButton.addEventListener('click', clearInput)