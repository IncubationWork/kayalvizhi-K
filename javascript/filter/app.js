const userFilterInput = document.getElementById('filter-number');
const buttonFilterInput = document.getElementById('filter-button');
const clearFilterBtn = document.getElementById('clr-button');
const result = document.getElementById('result-heading');
const ul = document.getElementById('movie-list');
const li = ul.getElementsByTagName('li');
const resultText = result.innerText;

/*const clearFun = () => {
    result.style.display = 'none';
    userFilterInput.value = '';
    result.innerText = '';
    let i=0;
    while(i<li.length) {
        li[i].style.display = 'flex';
        i++;
    }
}*/
const clearFun = () => { 
    ul.innerHTML='';
    userFilterInput.value = '';
    result.innerText = '';
    defaultData();
}

/*result.style.display = 'none';
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
}*/

const showItem = (productList) => {
    ul.innerHTML='';
    const filterValue = userFilterInput.value;
    result.innerText = resultText+ ` Rs. ${filterValue}`;
    let final = productList.map(function(val){
        const newMovieElement = document.createElement('li');
      newMovieElement.className = 'movie-element';
      newMovieElement.setAttribute('id','movie-element');
      newMovieElement.innerHTML = `
        <div class="movie-element__image">
          <img src="${val.image}" alt="${val.title}">
        </div>
        <div class="movie-element__info">
          <h2>${val.title}</h2>
          <p> Rs. <span>${val.rating}</span></p>
        </div>
      `;
      const listRoot = document.getElementById('movie-list');
      listRoot.append(newMovieElement);
    });
}

const filterItem = () => {
const filterValue = userFilterInput.value;
let newArray = movies.filter(function(el){

    return el.rating <= +filterValue;
});
showItem(newArray);
}

function disableResultText(){
    result.innerText = '';
}
disableResultText();
buttonFilterInput.addEventListener('click', filterItem);
clearFilterBtn.addEventListener('click', clearFun);
userFilterInput.addEventListener('click', clearFun);