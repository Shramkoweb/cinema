import {getSearch} from "./components/search";
import {getProfile} from "./components/profile";
import {getNavigation} from "./components/navigation";
import {getFilmCard} from "./components/film-card";

/* Ф-я рендера компонента */
const renderComponent = (container, component) => {
  return container.insertAdjacentHTML(`beforeend`, component);
};
