import {getSearch} from "./components/search";
import {getProfile} from "./components/profile";
import {getNavigation} from "./components/navigation";

/* Ф-я рендера компонента */
const renderComponent = (container, component) => {
  return container.insertAdjacentHTML(`beforeend`, component);
};
