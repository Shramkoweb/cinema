import {getMovies} from "./data";
import PageController from "./controllers/page-controller";
import {getRandomNumberInRange} from "./util";
import Statistics from "./components/statistics";

const moviesAmount = getRandomNumberInRange(0, 17); // Временно добавил для проверки работы фильтров и т.д
const movies = getMovies(moviesAmount);
const mainElement = document.querySelector(`.main`);
const filmsControllerInstance = new PageController(mainElement, movies);
const statisticsComponent = new Statistics(movies);

filmsControllerInstance.init();
document.body.appendChild(statisticsComponent.getElement());
