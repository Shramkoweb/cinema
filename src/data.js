import {getRandomBoolean, getRandomItemFrom, getRandomNumberInRange} from "./util";

const MAX_DESCRIPTION_COUNT = 3;
const MIN_DESCRIPTION_COUNT = 1;
const MIN_FILM_DURATION = 30;
const MAX_FILM_DURATION = 180;
const MIN_FILM_COMMENTS = 0;
const MAX_FILM_COMMENTS = 100;
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

const DIRECTORS = [
  `Adrian Grunberg`,
  `Tim Miller`,
  `Ric Roman Waugh`,
  `Tyler Gillett`,
  `Matt Bettinelli-Olpin`,
];

const WRITERS = [
  `Paul Downs Colaizzo`,
  `James Cameron`,
  `Charles H. Eglee`,
  `Josh Friedman`,
  `Justin Rhodes`,
  `Billy Ray`,
  `David S. Goyer`,
];

const ACTORS = [
  `Jillian Bell`,
  `Jennifer Dundas`,
  `Mikey Day`,
  `Michael Weist`,
  `Adam Brody`,
  `Liam MacDonald`,
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

const EMOJIS = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`,
  `trophy.png`
];

const COMMENTS = [
  `Cool`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `Nice try`,
  `Fantastic`,
];


/* Обьект под каждый коментарий*/
const getComment = () => ({
  comment: getRandomItemFrom(COMMENTS),
  author: getRandomItemFrom(WRITERS),
  date: new Date(Date.now()).getDay(),
  emoji: getRandomItemFrom(EMOJIS),
});

/* Массив коментариев */
const getComments = (count) => {
  return new Array(count).fill(``).map(getComment);
};

/* Получаем случайное описание фильма */
const getRandomDescription = (descriptions, count = 1) => {
  const radnomDescriptions = [];

  for (let i = 0; i < count; i++) {
    radnomDescriptions.push(getRandomItemFrom(descriptions));
  }

  return radnomDescriptions;
};

/* Мокап фильма */
const generateMovieMock = () => ({
  image: getRandomItemFrom(IMAGES),
  title: getRandomItemFrom(TITLES),
  originalTitle: getRandomItemFrom(TITLES),
  rating: getRandomNumberInRange(0, 10).toFixed(1),
  director: getRandomItemFrom(DIRECTORS),
  writers: [...WRITERS],
  actors: [...ACTORS],
  releaseDate: Date.now(),
  runtime: getRandomNumberInRange(MIN_FILM_DURATION, MAX_FILM_DURATION),
  country: getRandomItemFrom(COUNTRIES),
  genres: new Set([`Drama`, `Comedy`, `Film-Noir`, `Mystery`]),
  description: getRandomDescription(DESCRIPTIONS, getRandomNumberInRange(MIN_DESCRIPTION_COUNT, MAX_DESCRIPTION_COUNT)),
  age: getRandomNumberInRange(MIN_AGE, MAX_AGE),
  isFavorite: getRandomBoolean(),
  isWatched: getRandomBoolean(),
  isInWatchlist: getRandomBoolean(),
  comments: getComments(getRandomNumberInRange(MIN_FILM_COMMENTS, MAX_FILM_COMMENTS)),
});

/* Получаем массив фильмов */
export const getMovies = (count) => new Array(count).fill(``).map(generateMovieMock);
