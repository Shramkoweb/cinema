const getRandomItemFrom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

/* Получаем дату в нужном формате */
const getMovieFullDate = (date) => {
  return new Date(date).toLocaleDateString(`en-GB`, {
    day: `2-digit`,
    month: `long`,
    year: `numeric`,
  });
};

// get amount of watched films
const getWatchedMoviesAmount = (movies) => {
  return movies.reduce((accumulator, currentValue) => {
    return currentValue.isWatched ? ++accumulator : accumulator;
  }, 0);
};

// get Total diration of watched films
const getDurationOfWatchedFilms = (movies) => {
  const totalDurationInMinutes = movies.reduce((accumulator, currentValue) => {
    return currentValue.isWatched ? accumulator + currentValue.runtime : accumulator;
  }, 0);

  return formatFilmDuration(totalDurationInMinutes);
};


// getting user rating from watched movies
const getUserRating = (movies) => {
  let watchedMovies = getWatchedMoviesAmount(movies);

  const getUserTitle = (moviesWatched) => {
    let userTitle = ``;
    if (moviesWatched >= 21) {
      userTitle = `Movie Buff`;
    } else if (moviesWatched >= 11) {
      userTitle = `fan`;
    } else if (moviesWatched > 0) {
      userTitle = `novice`;
    }
    return userTitle;
  };

  return getUserTitle(watchedMovies);
};

/* Получаем случайное булевое значение */
const getRandomBoolean = () => {
  return Boolean(Math.round(Math.random()));
};

/* Получаем случайное число из диапазона */
const getRandomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
};

const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

/* Создаем елемент из темплейта */
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

/* Ф-я рендера компонента */
const renderElement = (container, element, place = Position.BEFOREEND) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

const isChecked = (state) => {
  return state ? `checked` : ``;
};

/* Убираем елемент если он есть */
const unrenderElement = (element) => {
  if (element) {
    element.remove();
  }
};

/* обработка ивента Esc */
const isEscKeyDown = (evt, action) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    action();
  }
};

// sorting types
const sortByComments = (films) => films.slice().sort((a, b) => b.comments.length - a.comments.length);
const sortByRating = (films) => films.slice().sort((a, b) => b.rating - a.rating);
const sortByDate = (films) => films.slice().sort((a, b) => a.releaseDate - b.releaseDate);
const defaultSort = (films) => films;

const compareTypeToSortFunction = {
  default: defaultSort,
  date: sortByDate,
  comments: sortByComments,
  rating: sortByRating,
};

const sortFilms = (films, compareType) => compareTypeToSortFunction[compareType](films);

// get formatting duration from film
const formatFilmDuration = (duration) => {
  const UNITS = {
    MINUTES_IN_HOUR: 60,
  };
  const hours = duration / UNITS.MINUTES_IN_HOUR;
  const roundedHours = Math.floor(hours);
  const roundedMinutes = Math.round((hours - roundedHours) * UNITS.MINUTES_IN_HOUR);

  return {
    hours: roundedHours,
    minutes: roundedMinutes,
  };
};

export {
  getRandomBoolean,
  getRandomItemFrom,
  getMovieFullDate,
  sortByComments,
  sortByDate,
  defaultSort,
  sortByRating,
  getRandomNumberInRange,
  getDurationOfWatchedFilms,
  sortFilms,
  renderElement,
  createElement,
  isEscKeyDown,
  formatFilmDuration,
  unrenderElement,
  isChecked,
  getUserRating,
  getWatchedMoviesAmount,
  Position,
};
