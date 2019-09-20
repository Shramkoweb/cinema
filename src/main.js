import {getMovies} from "./data";
import PageController from "./controllers/page-controller";
import Statistics from "./components/statistics";
import StatisticController from "./controllers/statistic-controller";

const moviesAmount = 11; // Временно добавил для проверки работы фильтров и т.д
const movies = getMovies(moviesAmount);
const mainElement = document.querySelector(`.main`);
const filmsControllerInstance = new PageController(mainElement, movies);
const statisticsComponent = new Statistics(movies);

filmsControllerInstance.init();
mainElement.appendChild(statisticsComponent.getElement());

const statisticsLink = mainElement.querySelector(`.main-navigation__item--additional`);
const showAllLink = mainElement.querySelector(`.main-navigation__item`);


const showStatistics = (evt) => {
  evt.preventDefault();

  statisticsComponent.show();
  filmsControllerInstance.hide();

  const chart = new StatisticController(movies);
  chart._renderChart();
};

const showMovies = (evt) => {
  evt.preventDefault();

  statisticsComponent.hide();
  filmsControllerInstance.show();
};

statisticsLink.addEventListener(`click`, showStatistics);
showAllLink.addEventListener(`click`, showMovies);

