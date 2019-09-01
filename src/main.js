import {getRandomNumberInRange} from "./util";
import {getMovies} from "./data";
import PageController from "./controllers/page-controller";

const moviesAmount = getRandomNumberInRange(0, 23); // Временно добавил для проверки работы фильтров и т.д
const moviesArray = getMovies(moviesAmount);

const mainElement = document.querySelector(`.main`);

const filmsController = new PageController(mainElement, moviesArray);
filmsController.init();
