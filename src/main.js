import {getMovies} from "./data";
import PageController from "./controllers/page-controller";

const moviesAmount = 11; // Временно добавил для проверки работы фильтров и т.д
const movies = getMovies(moviesAmount);
const mainElement = document.querySelector(`.main`);
const filmsControllerInstance = new PageController(mainElement, movies);

filmsControllerInstance.init();
