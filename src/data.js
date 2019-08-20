import {getRandomBoolean, getRandomItemFrom, getRandomNumberInRange, shuffleArray} from "./util";

const MAX_DESCRIPTION_COUNT = 3;
const MIN_DESCRIPTION_COUNT = 1;
const MIN_FILM_DURATION = 30;
const MAX_FILM_DURATION = 180;
const MINUTES_IN_HOUR = 60;
const MIN_FILM_COMMENTS = 0;
const MAX_FILM_COMMENTS = 300;
const MIN_AGE = 13;
const MAX_AGE = 18;

const TITLES = [
  `The Shawshank Redemption`,
  `Pulp Fiction`,
  `Avengers: Endgame`,
  `Gisaengchung `,
  `The Lion King`,
  `Spider-Man: Into the Spider-Verse`,
  `Avengers: Infinity War`,
  `Inglourious Basterds`,
  `Reservoir Dogs`,
  `Toy Story 4`,
  `The Farewell`,
  `The Wolf of Wall Street`,
  `The Lighthouse`,
  `Bohemian Rhapsody`,
  `Blade Runner 2049`,
  `Spider-Man: Far from Home`,
  `Thor: Ragnarok`,
  `John Wick: Chapter 3 - Parabellum`,
];

const IMAGES = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const COUNTRIES = [
  `USA`,
  `Germany`,
  `United Kingdom`,
  `France`,
  `Ukraine`,
  `USSR`,
  `Russia`,
];

/* Получаем случайное описание фильма */
const getRandomDescription = (descriptions, count = 1) => {
  shuffleArray(descriptions);

  return descriptions.slice(0, count);
};

/* Мокап фильма */
const generateMovieMock = () => ({
  image: getRandomItemFrom(IMAGES),
  title: getRandomItemFrom(TITLES),
  rating: getRandomNumberInRange(0, 10).toFixed(1),
  director: ``,
  writers: ``,
  actors: ``,
  releaseDate: Date.now(),
  runtime: (getRandomNumberInRange(MIN_FILM_DURATION, MAX_FILM_DURATION) / MINUTES_IN_HOUR).toFixed(1),
  country: getRandomItemFrom(COUNTRIES),
  genres: new Set([`Drama`, `Comedy`, `Film-Noir`, `Mystery`]),
  description: getRandomDescription(DESCRIPTIONS, getRandomNumberInRange(MIN_DESCRIPTION_COUNT, MAX_DESCRIPTION_COUNT)),
  age: getRandomNumberInRange(MIN_AGE, MAX_AGE),
  isFavorite: getRandomBoolean(),
  isWatched: getRandomBoolean(),
  isInWatchlist: getRandomBoolean(),
  comments: getRandomNumberInRange(MIN_FILM_COMMENTS, MAX_FILM_COMMENTS),
});

/* Получаем массив фильмов */
export const getMovies = (count) => new Array(count).fill(``).map(generateMovieMock);

/* Вычесляем количество фильмов подходящих под фильтр */
export const getFilterCount = (movies) => {
  const counts = {
    watchlist: 0,
    history: 0,
    favorites: 0,
  };

  movies.forEach((movie) => {
    counts.watchlist = movie.isInWatchlist ? counts.watchlist += 1 : counts.watchlist;
    counts.history = movie.isWatched ? counts.history += 1 : counts.history;
    counts.favorites = movie.isFavorite ? counts.favorites += 1 : counts.favorites;
  });

  const resultFilters = [];

  for (let [key, value] of Object.entries(counts)) {
    resultFilters.push({
      title: key,
      count: value
    });
  }

  return resultFilters;
};
