import {getRandomNumberInRange} from "./util";
import {getMovies} from "./data";
import PageController from "./controllers/page-controller";

const moviesAmount = 11; // Временно добавил для проверки работы фильтров и т.д
const moviesArray = getMovies(moviesAmount);
const MAX_MOVIES_TO_RENDER = 5;

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`header`);
// const board = new Films().getElement();
// const moviesContainer = board.querySelector(`.films-list .films-list__container`);
// const headerElement = document.querySelector(`header`);
// const mostCommentedContainer = board.querySelectorAll(`.films-list--extra .films-list__container`)[1];
// const mostRatedContainer = board.querySelectorAll(`.films-list--extra .films-list__container`)[0];
//
//
// const renderSearch = () => {
//   const searchInstance = new Search();
//   renderElement(headerElement, searchInstance.getElement(), Position.BEFOREEND);
// };
//
// const renderProfile = (movies) => {
//   const userInstance = new Profile(movies);
//   renderElement(headerElement, userInstance.getElement(), Position.BEFOREEND);
// };
//
// const renderNavigation = (filters) => {
//   const navigationInstance = new Navigation(filters);
//
//   renderElement(mainElement, navigationInstance.getElement(), Position.BEFOREEND);
// };
//
//
//
// renderSearch();
// renderProfile(moviesArray);
// renderNavigation(getFilterCount(moviesArray));

const filmsController = new PageController(mainElement, moviesArray);
filmsController.init();
