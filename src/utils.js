import {
  Code,
  PageFilterTitle,
  Position,
  SHORT_DESCRIPTION_LENGTH,
  UNIT,
  UserPoint,
  UserRang,
} from "./constants";


// Функции типов сортировок фильмов
export const sortByComments = (films) => films.slice().sort((a, b) => b.comments.length - a.comments.length);
export const sortByRating = (films) => films.slice().sort((a, b) => b.rating - a.rating);
export const sortByDate = (films) => films.slice().sort((a, b) => b.releaseDate - a.releaseDate);
export const defaultSort = (films) => films;


export const sortingTypeMap = {
  'comments': sortByComments,
  'date': sortByDate,
  'default': defaultSort,
  'rating': sortByRating,
};
// Сортировка по типу
export const sortFilms = (films, compareType) => sortingTypeMap[compareType](films);


export const getFiltersAmount = (movies) => { // Вычесляем количество фильмов подходящих под фильтр
  let watchlistCount = 0;
  let historyCount = 0;
  let favoriteCount = 0;

  for (let movie of movies) {
    if (movie.isFavorite) {
      favoriteCount++;
    }
    if (movie.isWatched) {
      historyCount++;
    }
    if (movie.isInWatchlist) {
      watchlistCount++;
    }
  }

  return [
    {
      title: `${PageFilterTitle.WATCHLIST}`,
      count: watchlistCount,
    },
    {
      title: `${PageFilterTitle.HISTORY}`,
      count: historyCount,
    },
    {
      title: `${PageFilterTitle.FAVORITES}`,
      count: favoriteCount,
    },
  ];
};


export const createElement = (template) => { // Создаем елемент из темплейта
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};


export const clipDescription = (description) => { // Обрезка описания если оно больше 140 символов
  return description.length > SHORT_DESCRIPTION_LENGTH ? `${description.slice(0, SHORT_DESCRIPTION_LENGTH - 1)} ...` : description;
};


export const formatFilmDuration = (duration) => { // Форматируем продолжительность фильма
  const hours = duration / UNIT.MINUTES_IN_HOUR;
  const roundedHours = Math.floor(hours);
  const roundedMinutes = Math.round((hours - roundedHours) * UNIT.MINUTES_IN_HOUR);

  return {
    hours: roundedHours,
    minutes: roundedMinutes,
  };
};


export const isChecked = (state) => { // Добавляет состояние checked
  return state ? `checked` : ``;
};


export const getWatchedMoviesAmount = (movies) => { // получаем общее число просмотренных фильмов
  return movies.reduce((accumulator, currentValue) => {
    return currentValue.isWatched ? ++accumulator : accumulator;
  }, 0);
};


export const getUserRating = (movies) => { // Получаем рейтинг пользователя
  let watchedMovies = getWatchedMoviesAmount(movies);

  const getUserTitle = (moviesWatched) => {
    if (moviesWatched >= UserPoint.BUFF) {
      return UserRang.BUFF;
    } else if (moviesWatched >= UserPoint.FAN) {
      return UserRang.FAN;
    } else if (moviesWatched > UserPoint.NOVICE) {
      return UserRang.NOVICE;
    }
    return ``;
  };

  return getUserTitle(watchedMovies);
};


export const renderElement = (container, element, place = Position.BEFOREEND) => { // Ф-я рендера компонента
  switch (place) {
    case Position.BEFOREBEGIN:
      container.before(element);
      break;
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTEREND:
      container.after(element);
      break;
    default:
      throw new Error(`Initial error.Incorrect position type`);
  }
};


export const unrenderElement = (element) => { // Убираем елемент если он есть
  if (element) {
    element.remove();
  }
};


export const checkResponseStatus = (response) => { // Проверка ответа сервера
  if (response.status >= Code.SUCCESS && response.status < Code.REDIRECTION) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};


export const toJSON = (response) => { // Приведение ответа к JSON
  return response.json();
};


export const getDurationWatchedFilms = (movies) => { // Общая продолжительность просмотренных фильмов
  const totalDurationInMinutes = movies.reduce((accumulator, currentValue) => {
    return currentValue.isWatched ? accumulator + currentValue.runtime : accumulator;
  }, 0);

  return formatFilmDuration(totalDurationInMinutes);
};


export const countUniqGenres = (films) => { // Вычисляем количество жанров без повторений
  const filmGenres = films.map((film) => Object.values([...film.genres]));

  return filmGenres.flat().reduce((acc, item) => {
    if (acc.hasOwnProperty(item)) {
      acc[item]++;
    } else {
      acc[item] = 1;
    }
    return acc;
  }, {});
};

export const getFavoriteGenre = (movies) => { // Получаем самый популярный жанр
  const findFavoriteGenre = (counter) => Object.keys(counter)
    .reduce((accumulator, currentValue) => (counter[accumulator] > counter[currentValue] ? accumulator : currentValue));

  return findFavoriteGenre(countUniqGenres(movies));
};
