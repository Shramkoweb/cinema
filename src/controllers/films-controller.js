import Films from "../components/films";
import {isEscKeyDown, Position, renderElement} from "../util";
import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";

export default class FilmsController {
  constructor(container, filmCards) {
    this._container = container;
    this._filmCards = filmCards;
    this._hasFilms = Boolean(filmCards.length);
    this._films = new Films(this._hasFilms);
  }

  _renderFilm(film) {
    const filmInstance = new FilmCard(film);
    const filmDetailsInstance = new FilmDetails(film);
    const filmsContainer = this._films.getElement().querySelector(`.films-list__container`);
    const onMoviePopUpEscPress = (evt) => isEscKeyDown(evt, closeMoviePopUp);

    const closeMoviePopUp = () => {
      filmsContainer.removeChild(filmDetailsInstance.getElement());
      document.removeEventListener(`keydown`, onMoviePopUpEscPress);
    };

    const openMoviePopup = () => {
      filmsContainer.appendChild(filmDetailsInstance.getElement());
      document.addEventListener(`keydown`, onMoviePopUpEscPress);
    };

    filmInstance.getElement()
      .addEventListener(`click`, openMoviePopup);

    filmDetailsInstance.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, closeMoviePopUp);

    filmDetailsInstance.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onMoviePopUpEscPress);
      });

    filmDetailsInstance.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onMoviePopUpEscPress);
      });

    renderElement(filmsContainer, filmInstance.getElement(), Position.BEFOREEND);
  }

  init() {
    renderElement(this._container, this._films.getElement(), Position.BEFOREEND);

    this._filmCards.forEach((filmMock) => this._renderFilm(filmMock));
  }
}
