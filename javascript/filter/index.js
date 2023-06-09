const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');



let movies = [{
  title: "Kids 1 - For your little princess",
  image: "images/download (1).jpeg",
  rating: "620"
},
{
  title: "Kids 2 - For your little princess",
  image: "images/download.jpeg",
  rating: "500"
},
{
  title: "Kids 3 - For your little princess",
  image: "images/download (2).jpeg",
  rating: "430"
},
{
  title: "Kids 4 - For your little princess",
  image: "images/images (2).jpeg",
  rating: "1430"
},
{
  title: "Kids 5 - For your little princess",
  image: "images/images (1).jpeg",
  rating: "830"
},
];

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

  const clearMovieInput = () => {
    for (const usrInput of userInputs) {
      usrInput.value = '';
    }
  };

const renderNewMovieElement = (title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.setAttribute('id','movie-element');
    newMovieElement.innerHTML = `
      <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
      </div>
      <div class="movie-element__info">
        <h2>${title}</h2>
        <p> Rs. <span>${rating}</span></p>
      </div>
    `;
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
  };

  const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
  };

  const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
  };


const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;
  
    if (
      titleValue.trim() === '' ||
      imageUrlValue.trim() === '' ||
      ratingValue.trim() === '' ||
      +ratingValue < 1
    ) {
      alert('Please enter valid values (price should be grater than 0).');
      return;
    }
  
    const newMovie = {
      title: titleValue,
      image: imageUrlValue,
      rating: ratingValue
    };
  
    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(
      newMovie.id,
      newMovie.title,
      newMovie.image,
      newMovie.rating
    );
  };

  startAddMovieButton.addEventListener('click', showMovieModal);
  confirmAddMovieButton.addEventListener('click', addMovieHandler);
  cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);


/*function defaultData(){
    let i=0;
    for(;i<movies.length;i++){
      const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.setAttribute('id','movie-element');
    newMovieElement.innerHTML = `
      <div class="movie-element__image">
        <img src="${movies[i].image}" alt="${movies[i].title}">
      </div>
      <div class="movie-element__info">
        <h2>${movies[i].title}</h2>
        <p> Rs. <span>${movies[i].rating}</span></p>
      </div>
    `;
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
}
}
defaultData();*/


function defaultData(){
  
  let final = movies.map(function(val){
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
defaultData();