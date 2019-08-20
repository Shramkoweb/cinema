import {getSearch} from "./components/search";
import {getProfile} from "./components/profile";
import {getNavigationTemplate} from "./components/filter";
import {getMovieDetailsTemplate} from "./components/movie-details";
import {getBoardTemplate} from "./components/movies";
import {getFilterCount, getMovies} from "./data";
import {renderComponent} from "./util";

const FILMS_COUNT = 23;
const FILMS = getMovies(FILMS_COUNT);

const headerElement = document.querySelector(`header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);


renderComponent(headerElement, getSearch());
renderComponent(headerElement, getProfile(FILMS));
renderComponent(mainElement, getNavigationTemplate(getFilterCount(FILMS)));
renderComponent(mainElement, getBoardTemplate(FILMS));
renderComponent(bodyElement, getMovieDetailsTemplate(FILMS[0]));
