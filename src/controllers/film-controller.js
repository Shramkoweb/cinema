import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import {isEscKeyDown, renderElement} from "../util";

export default class FilmController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._film = new FilmCard(data);
    this._filmPopup = new FilmDetails(data);

    this.create();
  }

  create() {
    const onMoviePopUpEscPress = (evt) => isEscKeyDown(evt, closeMoviePopUp);

    const closeMoviePopUp = () => {
      this._container.removeChild(this._filmPopup.getElement());
      document.removeEventListener(`keydown`, onMoviePopUpEscPress);
    };

    const openMoviePopup = () => {
      this._container.appendChild(this._filmPopup.getElement());
      document.addEventListener(`keydown`, onMoviePopUpEscPress);
    };

    this._film.getElement()
      .addEventListener(`click`, openMoviePopup);

    this._filmPopup.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, closeMoviePopUp);

    this._filmPopup.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onMoviePopUpEscPress);
      });

    this._filmPopup.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onMoviePopUpEscPress);
      });

    renderElement(this._container, this._film.getElement());
  }
}
