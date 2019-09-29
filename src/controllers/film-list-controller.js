import FilmController from "./film-controller";

class FilmListController {
  constructor(filmsContainer, ratedList, commentedList, onDataChange) {
    this._filmsContainer = filmsContainer;
    this._ratedList = ratedList;
    this._commentedList = commentedList;

    this._films = [];
    this._subscriptions = [];

    this._onDataChange = onDataChange;
    this._onChangeView = this._onChangeView.bind(this);
  }


  // Присвоить полученные фильмы и отрендерить их в контейнер
  setFilms(films) {
    this._films = films;
    this._subscriptions = [];
    this._films.forEach((film) => this._renderFilm(film, this._filmsContainer));
  }

  // Отрисовка одного экземпляра фильма
  _renderFilm(film, container) {
    const filmController = new FilmController(container, film);
    this._subscriptions.push(filmController.setDefaultView.bind(filmController));
  }

  // Отрисовка переданого массива фильмов
  _renderFilms(films, container) {
    films.forEach((film) => this._renderFilm(film, container));
  }


  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
}


export default FilmListController;
