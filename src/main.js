import {getMovies} from "./data";
import PageController from "./controllers/page-controller";
import {getRandomNumberInRange} from "./util";

const moviesAmount = getRandomNumberInRange(0, 17); // Временно добавил для проверки работы фильтров и т.д
const movies = getMovies(moviesAmount);
const mainElement = document.querySelector(`.main`);
const filmsControllerInstance = new PageController(mainElement, movies);

filmsControllerInstance.init();
