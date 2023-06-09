const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');

const movies = [];

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

const renderNewMovieElement = (id, title, imageUrl, rating) => {
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
      id: Math.random().toString(),
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