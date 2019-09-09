import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import {isEscKeyDown, renderElement, unrenderElement} from "../util";

export default class FilmController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._film = new FilmCard(data);
    this._filmPopup = new FilmDetails(data);
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._bodyElement = document.body;
    this._controlButtons = this._film.getElement().querySelector(`.film-card__controls`);
    this._filmStatusMap = {
      watched: `isWatched`,
      watchlist: `isInWatchlist`,
      favorite: `isFavorite`
    };

    this.init();
  }

  setDefaultView() {
    if (document.body.contains(this._filmPopup.getElement())) {
      unrenderElement(this._filmPopup.getElement());
      this._filmPopup.removeElement();
    }
  }

  init() {
    const onMoviePopUpEscPress = (evt) => isEscKeyDown(evt, closeMoviePopUp);

    const closeMoviePopUp = () => {
      this._bodyElement.removeChild(this._filmPopup.getElement());
      document.removeEventListener(`keydown`, onMoviePopUpEscPress);
    };

    const openMoviePopup = (evt) => {
      this._onChangeView();

      if (evt.target.tagName === `A` || evt.target.tagName === `H3` || evt.target.tagName === `IMG`) {
        this._bodyElement.appendChild(this._filmPopup.getElement());
        document.addEventListener(`keydown`, onMoviePopUpEscPress);
      }
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

    const onControlButtonClick = (evt) => {
      evt.target.classList.toggle(`film-card__controls-item--active`);

      const checkedControls = Array
        .from(this._controlButtons.querySelectorAll(`.film-card__controls-item--active`))
        .map((control) => control.getAttribute(`data-name`));

      const newData = checkedControls.reduce((acc, curr) => {
        acc[this._filmStatusMap[curr]] = true;

        return acc;
      }, {
        image: this._data.image,
        title: this._data.title,
        originalTitle: this._data.originalTitle,
        rating: this._data.rating,
        director: this._data.director,
        writers: this._data.writers,
        actors: this._data.actors,
        releaseDate: this._data.releaseDate,
        runtime: this._data.runtime,
        country: this._data.country,
        genres: this._data.genres,
        description: this._data.description,
        age: this._data.age,
        isFavorite: false,
        isWatched: false,
        isInWatchlist: false,
        comments: this._data.comments,
      });

      this._onDataChange(newData, this._data);
    };

    this._controlButtons.addEventListener(`click`, onControlButtonClick);

    renderElement(this._container, this._film.getElement());
  }
}
