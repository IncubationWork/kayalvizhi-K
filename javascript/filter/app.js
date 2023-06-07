const userFilterInput = document.getElementById('filter-number');
const buttonFilterInput = document.getElementById('filter-button');
const ul = document.getElementById('movie-list');
const li = ul.getElementsByTagName('li');

const filterItem = () => {
    const filterValue = userFilterInput.value;
    let i=0;
    if(filterValue.trim() === '' ||
    filterValue <=0){
            alert("Give an valid input");
        }
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

buttonFilterInput.addEventListener('click', filterItem);