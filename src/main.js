import Search from "./components/search";
import Navigation from "./components/navigation";
import MovieDetails from "./components/movie-details";
import {getFilterCount} from "./filter";
import {getRandomNumberInRange, isEscKeyDown, Position, renderElement} from "./util";
import {getMovies} from "./data";
import Profile from "./components/profile";
import Movie from "./components/movie";
import Movies from "./components/movies";

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

const board = new Movies().getElement();
const moviesContainer = board.querySelector(`.films-list .films-list__container`);

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

const renderMovieDetail = (movie) => {
  const foo = new MovieDetails(movie);

  renderElement(mainElement, foo.getElement(), Position.BEFOREEND);
};


renderSearch();
renderProfile(MOVIES);
renderNavigation(getFilterCount(MOVIES));


const renderMovies = (movies) => {
  const fragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    const movieInstance = new Movie(movie);
    const movieDetailsInstance = new MovieDetails(movie);
    const onTaskEditEscPress = (evt) => isEscKeyDown(evt, closeEditTask);

    const closeEditTask = () => {
      mainElement.removeChild(movieDetailsInstance.getElement());
      document.removeEventListener(`keydown`, onTaskEditEscPress);
    };

    movieInstance.getElement()
      .addEventListener(`click`, () => {
        mainElement.appendChild(movieDetailsInstance.getElement());
        document.addEventListener(`keydown`, onTaskEditEscPress);
      });

    fragment.appendChild(movieInstance.getElement());
  });

  return fragment;
};

const renderBoard = (movies) => {
  moviesContainer.appendChild(renderMovies(movies));

  renderElement(mainElement, board, Position.BEFOREEND);
};

renderBoard(MOVIES);
