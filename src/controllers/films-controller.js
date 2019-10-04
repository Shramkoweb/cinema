import FilmController from "./film-controller";
import {renderElement, sortFilms} from "../utils";
import {MAX_EXTRA_FILMS_AMOUNT, RenderPosition} from "../constants";

export default class FilmsController {
  constructor(filmsContainer, filmsList, onDataChange, renderPosition = RenderPosition.DEFAULT) {
    this._filmsContainer = filmsContainer;
    this._filmsList = filmsList;
    this._onDataChange = onDataChange;
    this._subscriptions = [];
    this._renderPosition = renderPosition;
    this._onChangeView = this._onChangeView.bind(this);
  }

  // Присвоить полученные фильмы и отрендерить их в контейнер
  init(films) {
    this._films = films;

    switch (this._renderPosition) {
      case RenderPosition.RATED:
        this._ratedFilms = sortFilms(this._films, `rating`).slice(0, MAX_EXTRA_FILMS_AMOUNT);
        this._ratedFilms.forEach((film) => this._renderFilm(film, this._filmsList));
        renderElement(this._filmsContainer.getElement(), this._filmsList.getElement());
        break;
      case RenderPosition.COMMENTED:
        this._commentedFilms = sortFilms(this._films, `comments`).slice(0, MAX_EXTRA_FILMS_AMOUNT);
        this._commentedFilms.forEach((film) => this._renderFilm(film, this._filmsList));
        renderElement(this._filmsContainer.getElement(), this._filmsList.getElement());
        break;
      case RenderPosition.DEFAULT:
        this._films.forEach((film) => this._renderFilm(film, this._filmsList));
        break;
      default:
        throw new Error(`Error in films controller`);
    }
  }

  // Отрисовка переданого массива фильмов
  _renderFilms(films, container) {
    films.forEach((film) => this._renderFilm(film, container));
  }

  // Отрисовка новых фильмов
  renderMoreFilms(films) {
    this._films = this._films.concat(films);
    this._renderFilms(this._films, this._filmsList);
  }

  // Отрисовка одного экземпляра фильма
  _renderFilm(film, container) {
    const filmController = new FilmController(container, film, this._onDataChange, this._onChangeView);
    this._subscriptions.push(filmController.setDefaultView.bind(filmController));
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
}
