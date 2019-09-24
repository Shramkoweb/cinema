const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const Code = {
  SUCCESS: 200,
  REDIRECT: 300,
};

const getRandomItemFrom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// get amount of watched films
const getWatchedMoviesAmount = (movies) => {
  return movies.reduce((accumulator, currentValue) => {
    return currentValue.isWatched ? ++accumulator : accumulator;
  }, 0);
};

// get Total duration of watched films
const getDurationOfWatchedFilms = (movies) => {
  const totalDurationInMinutes = movies.reduce((accumulator, currentValue) => {
    return currentValue.isWatched ? accumulator + currentValue.runtime : accumulator;
  }, 0);

  return formatFilmDuration(totalDurationInMinutes);
};

const countUniqGenres = (movies) => {
  const filmGenres = movies.map((movies) => Object.values(movies.genres));

  return filmGenres.flat().reduce((acc, item) => {
    if (acc[item]) {
      acc[item]++;
    } else {
      acc[item] = 1;
    }
    return acc;
  }, {});
};

// get Favorite genre in all movies
const getFavoriteGenre = (movies) => {
  if (!movies.length) {
    return undefined;
  }

  const findFavoriteGenre = (counter) => Object.keys(counter)
    .reduce((accumulator, currentValue) => (counter[accumulator] > counter[currentValue] ? accumulator : currentValue));

  return findFavoriteGenre(countUniqGenres(movies));
};

// getting user rating from watched movies
const getUserRating = (movies) => {
  let watchedMovies = getWatchedMoviesAmount(movies);

  const getUserTitle = (moviesWatched) => {
    if (moviesWatched >= 21) {
      return `Movie Buff`;
    } else if (moviesWatched >= 11) {
      return `Fan`;
    } else if (moviesWatched > 0) {
      return `Novice`;
    }
    return ``;
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

const hideElement = (element) => {
  element.classList.add(`visually-hidden`);
};

const showElement = (element) => {
  element.classList.remove(`visually-hidden`);
};

const toJSON = (response) => {
  return response.json();
};

const checkStatus = (response) => {
  if (response.status >= Code.SUCCESS && response.status < Code.REDIRECT) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export {
  getRandomBoolean,
  getRandomItemFrom,
  sortByComments,
  sortByDate,
  defaultSort,
  sortByRating,
  getRandomNumberInRange,
  getDurationOfWatchedFilms,
  sortFilms,
  hideElement,
  checkStatus,
  showElement,
  renderElement,
  createElement,
  isEscKeyDown,
  formatFilmDuration,
  unrenderElement,
  isChecked,
  getUserRating,
  getFavoriteGenre,
  getWatchedMoviesAmount,
  Position,
  Method,
  countUniqGenres,
  toJSON,
};
