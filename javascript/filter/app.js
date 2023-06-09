const userFilterInput = document.getElementById('filter-number');
const buttonFilterInput = document.getElementById('filter-button');
const clearFilterBtn = document.getElementById('clr-button');
const result = document.getElementById('result-heading');
const ul = document.getElementById('movie-list');
const li = ul.getElementsByTagName('li');
const resultText = result.innerText;
console.log(resultText);

const clearFun = () => {
    result.style.display = 'none';
    userFilterInput.value = '';
    result.innerText = '';
    let i=0;
    while(i<li.length) {
        li[i].style.display = 'flex';
        i++;
    }
}

result.style.display = 'none';
const filterItem = () => {
    result.style.display = 'block'; 
    const filterValue = userFilterInput.value;
    result.innerText = resultText+ ` Rs. ${filterValue}`;
    let i=0;
    if(filterValue.trim() === '' ||
    filterValue <=0){
        result.style.display = 'none';
            alert("Give an valid input");
            
        } else {
        for(;i<li.length;i++){
        const check = li[i].lastElementChild.children[1].firstElementChild;
        const checkValue = +check.textContent;
        if(checkValue <= +filterValue){
            li[i].style.display = 'flex';
        } else {
            li[i].style.display = 'none';
        }
    }
}

}

buttonFilterInput.addEventListener('click', filterItem);
clearFilterBtn.addEventListener('click', clearFun);
userFilterInput.addEventListener('click', clearFun);