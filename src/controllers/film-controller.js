import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import {isEscKeyDown, Position, renderElement, unrenderElement} from "../util";
import FilmDetailsRating from "../components/film-details-rating";

export default class FilmController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._film = new FilmCard(data);
    this._filmPopup = new FilmDetails(data);
    this._filmRatingComponent = new FilmDetailsRating({title: data.title, image: data.image});
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._bodyElement = document.body;
    this._controlButtons = this._film.getElement().querySelector(`.film-card__controls`);
    this._filmPopupControls = this._filmPopup.getElement().querySelector(`.film-details__controls`);
    this._filmStatusMap = {
      watched: `isWatched`,
      watchlist: `isInWatchlist`,
      favorite: `isFavorite`
    };

    this.init();
  }

  // set default statement
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

    // Click on film card controls
    const onFilmControlClick = (evt) => {
      evt.target.classList.toggle(`film-card__controls-item--active`);

      const checkedControls = Array
        .from(this._controlButtons.querySelectorAll(`.film-card__controls-item--active`))
        .map((control) => control.getAttribute(`data-name`));

      const newData = this.generateNewData(this._filmPopup.getElement(), checkedControls);
      this._onDataChange(newData, this._data);
    };

    // Click on film popup controls
    const onDetailedControlClick = () => {
      const checkedControls = Array
        .from(this._filmPopup.getElement().querySelectorAll(`.film-details__control-input:checked`))
        .map((control) => control.getAttribute(`name`));

      const newData = this.generateNewData(this._filmPopup.getElement(), checkedControls);

      this._onDataChange(newData, this._data);
    };

    this._controlButtons.addEventListener(`click`, onFilmControlClick);
    this._filmPopupControls.addEventListener(`change`, onDetailedControlClick);

    renderElement(this._container, this._film.getElement());
  }

  generateNewData(element, checkedControls) {

    const comments = [...element.querySelectorAll(`.film-details__comment`)].map((comment) => {
      return {
        author: comment.querySelector(`.film-details__comment-author`).textContent,
        comment: comment.querySelector(`.film-details__comment-text`).textContent,
        emoji: comment.querySelector(`.film-details__comment-emoji`).querySelector(`img`).getAttribute(`data-name`),
        date: new Date(comment.querySelector(`.film-details__comment-day`).textContent)
      };
    });

    const currentScore = element.querySelector(`.film-details__user-rating-input:checked`);
    const userScore = currentScore ? currentScore.value : ``;

    return checkedControls.reduce((acc, curr) => {
      acc[this._filmStatusMap[curr]] = true;

      return acc;
    }, {
      id: this._data.id,
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
      userScore,
      comments,
      description: this._data.description,
      age: this._data.age,
      isFavorite: false,
      isWatched: false,
      isInWatchlist: false,
    });
  }
}
