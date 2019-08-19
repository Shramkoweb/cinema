import {getSearch} from "./components/search";
import {getProfile} from "./components/profile";
import {getNavigation} from "./components/navigation";
import {getFilmDetails} from "./components/movie-details";
import {getBoardTemplate, getMostCommentedMovies} from "./components/movies";
import {getMovies} from "./data";

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
renderComponent(headerElement, getProfile());
renderComponent(mainElement, getNavigation());
renderComponent(mainElement, getBoardTemplate(FILMS));
renderComponent(bodyElement, getFilmDetails());


console.table(getMostCommentedMovies(FILMS));
