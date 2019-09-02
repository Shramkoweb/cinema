import {getRandomNumberInRange} from "./util";
import {getMovies} from "./data";
import PageController from "./controllers/page-controller";

const moviesAmount = getRandomNumberInRange(0, 23); // Временно добавил для проверки работы фильтров и т.д
const movies = getMovies(moviesAmount);
const mainElement = document.querySelector(`.main`);
const filmsControllerInstance = new PageController(mainElement, movies);

filmsControllerInstance.init();
