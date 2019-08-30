import Search from "./components/search";
import Navigation from "./components/navigation";
import MovieDetails from "./components/movie-details";
import {getFilterCount} from "./filter";
import {
  getRandomNumberInRange,
  isEscKeyDown,
  Position, renderComponent,
  renderElement,
  sortByComments,
  sortByRating,
  unrenderElement,
} from "./util";
import {getMovies} from "./data";
import Profile from "./components/profile";
import Movie from "./components/movie";
import Movies from "./components/movies";
import EmptyBoard from "./components/empty-board";

const moviesAmount = getRandomNumberInRange(5, 25); // Временно добавил для проверки работы фильтров и т.д
const moviesArray = getMovies(moviesAmount);
const MAX_MOVIES_TO_RENDER = 5;

const mainElement = document.querySelector(`.main`);

const board = new Movies().getElement();
const moviesContainer = board.querySelector(`.films-list .films-list__container`);
const headerElement = document.querySelector(`header`);
const mostCommentedContainer = board.querySelectorAll(`.films-list--extra .films-list__container`)[1];
const mostRatedContainer = board.querySelectorAll(`.films-list--extra .films-list__container`)[0];


const renderSearch = () => {
  const searchInstance = new Search();
  renderElement(headerElement, searchInstance.getElement(), Position.BEFOREEND);
};

const renderProfile = (movies) => {
  const userInstance = new Profile(movies);
  renderElement(headerElement, userInstance.getElement(), Position.BEFOREEND);
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
    const onMoviePopUpEscPress = (evt) => isEscKeyDown(evt, closeMoviePopUp);

    const closeMoviePopUp = () => {
      mainElement.removeChild(movieDetailsInstance.getElement());
      document.removeEventListener(`keydown`, onMoviePopUpEscPress);
    };

    const opeMoviePopup = () => {
      mainElement.appendChild(movieDetailsInstance.getElement());
      document.addEventListener(`keydown`, onMoviePopUpEscPress);
    };

    movieInstance.getElement()
      .addEventListener(`click`, opeMoviePopup);

    movieDetailsInstance.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, closeMoviePopUp);

    movieDetailsInstance.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onMoviePopUpEscPress);
      });

    movieDetailsInstance.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onMoviePopUpEscPress);
      });

    fragment.appendChild(movieInstance.getElement());
  });

  return fragment;
};

const renderBoard = (movies) => {
  if (movies.length === 0) {
    const epmtyBoardInstance = new EmptyBoard();
    renderElement(mainElement, epmtyBoardInstance.getElement(), Position.BEFOREEND);
  } else {
    moviesContainer.appendChild(renderMovies(movies.slice(0, MAX_MOVIES_TO_RENDER)));
    mostCommentedContainer.appendChild(renderMovies(Movies.getSortingArray(movies, sortByComments)));
    mostRatedContainer.appendChild(renderMovies(Movies.getSortingArray(movies, sortByRating)));

    renderElement(mainElement, board, Position.BEFOREEND);

    const loadMoreButton = mainElement.querySelector(`.films-list__show-more`);


    let moviesOnPage = 8;
    let leftMoviesToRender = moviesArray.length - moviesOnPage;

    const renderLeftMovies = () => {
      moviesContainer.appendChild(renderMovies(moviesArray.slice(moviesOnPage, (moviesOnPage + MAX_MOVIES_TO_RENDER))));

      moviesOnPage = moviesOnPage + MAX_MOVIES_TO_RENDER;
      leftMoviesToRender = moviesArray.length - moviesOnPage;

      if (leftMoviesToRender <= 0) {
        unrenderElement(loadMoreButton);
      }
    };

    const onLoadMoreButtonClick = () => {
      renderLeftMovies();
    };

    loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
  }
};

renderSearch();
renderProfile(moviesArray);
renderNavigation(getFilterCount(moviesArray));
renderBoard(moviesArray);

// // .header initialization
// const initHeader = (movies) => {
//   const headerElement = document.querySelector(`header`);
//   const searchElement = new Search().getElement();
//   const userProfileElement = new Profile(movies).getElement();
//
//   const fragment = document.createDocumentFragment();
//   fragment.appendChild(searchElement);
//   fragment.appendChild(userProfileElement);
//
//   renderElement(headerElement, fragment, Position.BEFOREEND);
// };
//
// // .main initialization
// const initMain = (movies) => {
//   initHeader(movies);
// };
//
// // page initialization on load
// const init = (movies) => {
//   const footerStatisticsElement = document.querySelector(`.footer__statistics p`);
//   footerStatisticsElement.textContent = `${movies.length} movies inside`;
//
//   initMain(movies);
// };
//
// init(moviesArray);
