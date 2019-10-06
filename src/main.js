import API from "./api";
import Loading from "./components/loading";
import MenuController from "./controllers/menu-controller";
import PageController from "./controllers/page-controller";
import Profile from "./components/profile";
import Search from "./components/search";
import SearchController from "./controllers/search-controller";
import StatisticController from "./controllers/statistic-controller";
import {AUTHORIZATION, MIN_SEARCH_PHRASE, URL, ActionType} from "./constants";
import {renderElement, unrenderElement} from "./utils";

const footerFilmsAmountElement = document.querySelector(`.footer__statistics p`);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

// API & статические компоненты
const api = new API({authorization: AUTHORIZATION, endPoint: URL});
const searchComponent = new Search();
const loadingComponent = new Loading();


// Изменения состояния котроллеров при активации поиска
const setSearchState = (state) => {
  menuController.setSearch(state);
  pageController.setSearch(state);
  searchController.setState(state);
};

const onSearchReset = () => {
  searchController.hide();
  statisticController.hide();

  // Сбрасиваем все контроллеры
  setSearchState(false);
  // отрисовка страницы п исходное состояние
  onDataChange(ActionType.CREATE);
};


const onDataChange = (actionType, updatedFilm, callback, callbackError) => {
  switch (actionType) {
    case ActionType.UPDATE:
      api.updateFilm({
        id: updatedFilm.id,
        film: updatedFilm.toRAW(),
      })
        .then(() => api.getFilms())
        .then((movies) => {
          menuController.show(movies);
          pageController.show(movies);
          searchController.show(movies);
        });
      break;
    case ActionType.CREATE:
      renderElement(mainElement, loadingComponent.getElement());
      api.getFilms().then((movies) => {
        unrenderElement(loadingComponent.getElement());
        loadingComponent.removeElement();
        menuController.show(movies);
        pageController.show(movies);
        searchController.show(movies);
        footerFilmsAmountElement.textContent = `${movies.length} movies inside`;
      });
      break;
    case ActionType.CREATE_COMMENT:
      api.createComment({
        id: updatedFilm.id,
        comment: updatedFilm.comment,
      })
        .then(() => api.getFilms())
        .then((movies) => {
          pageController.show(movies);
          callback();
        });
      break;
    case ActionType.DELETE_COMMENT:
      api.deleteComment({
        commentId: updatedFilm.id,
      })
        .then(() => api.getFilms())
        .then((movies) => {
          pageController.show(movies);
          callback();
        });
      break;
    case ActionType.UPDATE_RATING:
      api.updateFilm({
        id: updatedFilm.id,
        film: updatedFilm.toRAW(),
      })
        .then(() => api.getFilms())
        .then((movies) => {
          menuController.show(movies);
          pageController.show(movies);
          searchController.show(movies);
          callback();
        })
        .catch(() => {
          callbackError();
        });
      break;
    default:
      throw new Error(`Error onDataChange`);
  }
};


// Контроллеры
const statisticController = new StatisticController(mainElement);
const pageController = new PageController(mainElement, onDataChange);
const searchController = new SearchController(mainElement, searchComponent, onDataChange, onSearchReset);
const menuController = new MenuController(mainElement, pageController, searchController, statisticController);


// отрисовка статики Поиска и Загрзки до ответа сервера
renderElement(headerElement, searchComponent.getElement());
renderElement(mainElement, loadingComponent.getElement());


// Создание профиля пользователя
api.getFilms().then((films) => {
  const profileComponent = new Profile(films);
  renderElement(headerElement, profileComponent.getElement());
});


// Скрыть елементы вне дефю состояния
const hideMainPage = () => {
  menuController.hide();
  pageController.hide();
  statisticController.hide();
  setSearchState(true);
};


// Вернуть мейн к дефолту
const initMainPage = () => {
  searchController.hide();
  statisticController.hide();
  pageController._init();
  setSearchState(false);
  onDataChange(ActionType.CREATE);
};


searchComponent.getElement().querySelector(`.search__field`).addEventListener(`keyup`, (evt) => {
  const eventLength = evt.target.value.length;

  if (eventLength >= MIN_SEARCH_PHRASE) {
    hideMainPage();
    api.getFilms().then((movies) => searchController.show(movies));
  } else if (eventLength === 0) {
    initMainPage();
  }
});


initMainPage();
