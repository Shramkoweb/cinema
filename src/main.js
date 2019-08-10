import {getSearch} from "./components/search";
import {getProfile} from "./components/profile";
import {getNavigation} from "./components/navigation";
import {getFilmDetails} from "./components/film-details";
import {getFilms} from "./components/films";

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
renderComponent(mainElement, getFilms(5));
renderComponent(bodyElement, getFilmDetails());
