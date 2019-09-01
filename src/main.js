import {getRandomNumberInRange} from "./util";
import {getMovies} from "./data";
import PageController from "./controllers/page-controller";

const moviesAmount = getRandomNumberInRange(5, 25); // Временно добавил для проверки работы фильтров и т.д
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
// const renderBoard = (movies) => {
//   if (movies.length === 0) {
//     const epmtyBoardInstance = new EmptyBoard();
//     renderElement(mainElement, epmtyBoardInstance.getElement(), Position.BEFOREEND);
//   } else {
//     moviesContainer.appendChild(renderMovies(movies.slice(0, MAX_MOVIES_TO_RENDER)));
//     mostCommentedContainer.appendChild(renderMovies(getSortingArray(movies, sortByComments)));
//     mostRatedContainer.appendChild(renderMovies(getSortingArray(movies, sortByRating)));
//     renderElement(mainElement, board, Position.BEFOREEND);
//
//     const loadMoreButton = mainElement.querySelector(`.films-list__show-more`);
//
//
//     let MOVIES_ON_PAGE = 8;
//     let leftMoviesToRender = moviesArray.length - MOVIES_ON_PAGE;
//
//     const renderLeftMovies = () => {
//       const leftMovies = renderMovies(moviesArray.slice(MOVIES_ON_PAGE, (MOVIES_ON_PAGE + MAX_MOVIES_TO_RENDER)));
//       moviesContainer.appendChild(leftMovies);
//
//       MOVIES_ON_PAGE = MOVIES_ON_PAGE + MAX_MOVIES_TO_RENDER;
//       leftMoviesToRender = moviesArray.length - MOVIES_ON_PAGE;
//
//       if (leftMoviesToRender <= 0) {
//         unrenderElement(loadMoreButton);
//       }
//     };
//
//     const onLoadMoreButtonClick = () => {
//       renderLeftMovies();
//     };
//
//     loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
//   }
// };
//
// renderSearch();
// renderProfile(moviesArray);
// renderNavigation(getFilterCount(moviesArray));
// renderBoard(moviesArray);

const filmsController = new PageController(mainElement, moviesArray);
filmsController.init();
