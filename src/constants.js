export const AUTHORIZATION = `Basic eo0w590ik29889a=${Math.random()}`;
export const MAX_EXTRA_FILMS_AMOUNT = 2;
export const MAX_FILMS_TO_RENDER = 5;
export const MIN_SEARCH_PHRASE = 3;
export const SHORT_DESCRIPTION_LENGTH = 140;
export const USER_SCORE_AMOUNT = 9;
export const ANIMATION_DELAY = 1000; // 1s
export const URL = `https://htmlacademy-es-9.appspot.com/cinemaddict/`;
export const MIN_GENRE_AMOUNT = 1;

export const Method = {
  DELETE: `DELETE`,
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
};

export const RenderPosition = {
  COMMENTED: `commented`,
  DEFAULT: `default`,
  RATED: `rated`,
};

export const UNIT = {
  MINUTES_IN_HOUR: 60,
};

export const MenuFilter = {
  Watchlist: `isInWatchlist`,
  History: `isWatched`,
  Favorites: `isFavorite`,
};

export const FilmStatusMap = {
  watched: `isWatched`,
  watchlist: `isInWatchlist`,
  favorite: `isFavorite`,
};

export const ActionType = {
  CREATE: `create`,
  CREATE_COMMENT: `create_comment`,
  DELETE_COMMENT: `delete_comment`,
  UPDATE: `update`,
  UPDATE_RATING: `update_rating`,
};

export const Code = {
  INFORMATIONAL: 100,
  SUCCESS: 200,
  REDIRECTION: 300,
  ERROR: 400,
  SERVER_ERROR: 500,
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREBEGIN: `beforebegin`,
  BEFOREEND: `beforeend`,
};

export const UserRang = {
  BUFF: `Movie Buff`,
  FAN: `Fan`,
  NOVICE: `Novice`,
};

export const UserPoint = {
  BUFF: 21,
  FAN: 11,
  NOVICE: 0,
};

export const PageFilterTitle = {
  ALL: `All`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
  STATS: `Stats`,
};

export const StatisticPeriod = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};

export const STATISTIC_FILTERS = [
  {id: `all-time`, title: `All time`, checked: true},
  {id: `month`, title: `Month`},
  {id: `today`, title: `Today`},
  {id: `week`, title: `Week`},
  {id: `year`, title: `Year`},
];
