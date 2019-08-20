import {getSearch} from "./components/search";
import {getProfile} from "./components/profile";
import {getNavigationTemplate} from "./components/filter";
import {getFilmDetails} from "./components/movie-details";
import {getBoardTemplate} from "./components/movies";
import {getFilterCount, getMovies} from "./data";

const FILMS_COUNT = 23;
const FILMS = getMovies(FILMS_COUNT);

const headerElement = document.querySelector(`header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);

/* Ф-я рендера компонента */
const renderComponent = (container, component) => {
  return container.insertAdjacentHTML(`beforeend`, component);
};

renderComponent(headerElement, getSearch());
renderComponent(headerElement, getProfile(FILMS));
renderComponent(mainElement, getNavigationTemplate(getFilterCount(FILMS)));
renderComponent(mainElement, getBoardTemplate(FILMS));
renderComponent(bodyElement, getFilmDetails());
