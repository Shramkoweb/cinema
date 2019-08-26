import Search from "./components/search";
import Navigation from "./components/navigation";
import MovieDetails from "./components/movie-details";
import {getFilterCount} from "./filter";
import {getRandomNumberInRange, isEscKeyDown, Position, renderElement, unrenderElement} from "./util";
import {getMovies} from "./data";
import Profile from "./components/profile";
import Movie from "./components/movie";
import Movies from "./components/movies";

const MOVIES_COUNT = 25; // Временно добавил для проверки работы фильтров и т.д
const MOVIES = getMovies(MOVIES_COUNT);
const MAX_MOVIES_TO_RENDER = 5;

const headerElement = document.querySelector(`header`);
const mainElement = document.querySelector(`.main`);

const board = new Movies().getElement();
const moviesContainer = board.querySelector(`.films-list .films-list__container`);
const mostCommentedContainer = board.querySelectorAll(`.films-list--extra .films-list__container`)[1];
const mostRatedContainer = board.querySelectorAll(`.films-list--extra .films-list__container`)[0];

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
  moviesContainer.appendChild(renderMovies(movies.slice(0, MAX_MOVIES_TO_RENDER)));
  mostCommentedContainer.appendChild(renderMovies(Movies.getMostCommentedMovies(movies)));
  mostRatedContainer.appendChild(renderMovies(Movies.getMostRatedMovies(movies)));

  renderElement(mainElement, board, Position.BEFOREEND);
};

renderSearch();
renderProfile(MOVIES);
renderNavigation(getFilterCount(MOVIES));
renderBoard(MOVIES);

const loadMoreButton = mainElement.querySelector(`.films-list__show-more`);


let MOVIES_ON_PAGE = MAX_MOVIES_TO_RENDER;
let LEFT_MOVIES_TO_RENDER = MOVIES.length - MOVIES_ON_PAGE;

const renderLeftMovies = () => {
  moviesContainer.appendChild(renderMovies(MOVIES.slice(MOVIES_ON_PAGE, (MOVIES_ON_PAGE + MAX_MOVIES_TO_RENDER))));

  MOVIES_ON_PAGE = MOVIES_ON_PAGE + MAX_MOVIES_TO_RENDER;
  LEFT_MOVIES_TO_RENDER = MOVIES.length - MOVIES_ON_PAGE;

  if (LEFT_MOVIES_TO_RENDER <= 0) {
    unrenderElement(loadMoreButton);
  }
};

const onLoadMoreButtonClick = () => {
  renderLeftMovies();
};

loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
