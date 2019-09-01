import Search from "./components/search";
import Navigation from "./components/navigation";
import FilmDetails from "./components/film-details";
import {getFilterCount} from "./filter";
import {
  getRandomNumberInRange, getSortingArray,
  isEscKeyDown,
  Position,
  renderElement,
  sortByComments,
  sortByRating,
  unrenderElement,
} from "./util";
import {getMovies} from "./data";
import Profile from "./components/profile";
import FilmCard from "./components/film-card";
import Films from "./components/films";
import EmptyBoard from "./components/empty-board";

const moviesAmount = getRandomNumberInRange(5, 25); // Временно добавил для проверки работы фильтров и т.д
const moviesArray = getMovies(moviesAmount);
const MAX_MOVIES_TO_RENDER = 5;

const mainElement = document.querySelector(`.main`);

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
// const renderMovies = (movies) => {
//   const fragment = document.createDocumentFragment();
//
//   movies.forEach((movie) => {
//     const movieInstance = new FilmCard(movie);
//     const movieDetailsInstance = new FilmDetails(movie);
//     const onMoviePopUpEscPress = (evt) => isEscKeyDown(evt, closeMoviePopUp);
//
//     const closeMoviePopUp = () => {
//       mainElement.removeChild(movieDetailsInstance.getElement());
//       document.removeEventListener(`keydown`, onMoviePopUpEscPress);
//     };
//
//     const openMoviePopup = () => {
//       mainElement.appendChild(movieDetailsInstance.getElement());
//       document.addEventListener(`keydown`, onMoviePopUpEscPress);
//     };
//
//     movieInstance.getElement()
//       .addEventListener(`click`, openMoviePopup);
//
//     movieDetailsInstance.getElement()
//       .querySelector(`.film-details__close-btn`)
//       .addEventListener(`click`, closeMoviePopUp);
//
//     movieDetailsInstance.getElement().querySelector(`textarea`)
//       .addEventListener(`focus`, () => {
//         document.removeEventListener(`keydown`, onMoviePopUpEscPress);
//       });
//
//     movieDetailsInstance.getElement().querySelector(`textarea`)
//       .addEventListener(`blur`, () => {
//         document.addEventListener(`keydown`, onMoviePopUpEscPress);
//       });
//
//     fragment.appendChild(movieInstance.getElement());
//   });
//
//   return fragment;
// };
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
