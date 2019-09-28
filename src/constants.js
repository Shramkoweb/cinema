import {sortByComments, defaultSort, sortByDate, sortByRating} from "./utils";

export const AUTHORIZATION = `Basic eo0w590ik29889a`;
export const MAX_EXTRA_FILMS_AMOUNT = 2;
export const MAX_FILMS_TO_RENDER = 5;
export const MIN_SEARCH_PHRASE = 3;
export const SHORT_DESCRIPTION_LENGTH = 140;
export const URL = `https://htmlacademy-es-9.appspot.com/cinemaddict/`;

export const Method = {
  DELETE: `DELETE`,
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
};

export const UNIT = {
  MINUTES_IN_HOUR: 60,
};

export const ActionType = {
  CREATE: `create`,
  CREATE_COMMENT: `create_comment`,
  DELETE_COMMENT: `delete_comment`,
  UPDATE: `update`,
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
  ALL: `All movies`,
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

export const sortingTypeMap = {
  'comments': sortByComments,
  'date': sortByDate,
  'default': defaultSort,
  'rating': sortByRating,
};

