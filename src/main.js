import Search, {getSearch} from "./components/search";
import Navigation, {getNavigationTemplate} from "./components/navigation";
import {getMovieDetailsTemplate} from "./components/movie-details";
import {getBoardTemplate, getMoviesTamplate} from "./components/movies";
import {getFilterCount} from "./filter";
import {getRandomNumberInRange, Position, renderComponent, renderElement} from "./util";
import {getMovies} from "./data";
import Profile from "./components/profile";

const MOVIES_COUNT = getRandomNumberInRange(5, 35); // Временно добавил для проверки работы фильтров и т.д
const MOVIES = getMovies(MOVIES_COUNT);
const MAX_MOVIES_TO_RENDER = 5;

const headerElement = document.querySelector(`header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);

//
// renderComponent(headerElement, getSearch());
// renderComponent(headerElement, getProfile(MOVIES));
// renderComponent(mainElement, getNavigationTemplate(getFilterCount(MOVIES)));
// renderComponent(mainElement, getBoardTemplate(MOVIES.slice(0, MAX_MOVIES_TO_RENDER)));
// renderComponent(bodyElement, getMovieDetailsTemplate(MOVIES[0]));
//
//
// const loadMoreButton = mainElement.querySelector(`.films-list__show-more`);
// const filmListElement = mainElement.querySelector(`.films-list__container`);
//
// let MOVIES_ON_PAGE = MAX_MOVIES_TO_RENDER;
// let LEFT_MOVIES_TO_RENDER = MOVIES.length - MOVIES_ON_PAGE;
//
// const renderLeftCards = () => {
//   renderComponent(filmListElement, getMoviesTamplate(MOVIES.slice(MOVIES_ON_PAGE, (MOVIES_ON_PAGE + MAX_MOVIES_TO_RENDER))));
//
//   MOVIES_ON_PAGE = MOVIES_ON_PAGE + MAX_MOVIES_TO_RENDER;
//   LEFT_MOVIES_TO_RENDER = MOVIES.length - MOVIES_ON_PAGE;
//
//   if (LEFT_MOVIES_TO_RENDER <= 0) {
//     loadMoreButton.classList.add(`visually-hidden`);
//     loadMoreButton.removeEventListener(`click`, onLoadMoreButtonClick);
//   }
// };
//
// const onLoadMoreButtonClick = () => {
//   renderLeftCards();
// };
//
// loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);

const renderSearch = () => {
  const searchInstance = new Search();

  renderElement(headerElement, searchInstance.getElement(), Position.BEFOREEND);
};

const renderProfile = (movies) => {
  const profileInstance = new Profile(movies);

  renderElement(headerElement, profileInstance.getElement(), Position.BEFOREEND);
};

const renderNavigation = (filters) => {
  const navigationInstance = new Navigation(filters);

  renderElement(mainElement, navigationInstance.getElement(), Position.BEFOREEND);
};

renderSearch();
renderProfile(MOVIES);
renderNavigation(getFilterCount(MOVIES));
