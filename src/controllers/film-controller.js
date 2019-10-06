import API from "../api";
import CommentController from "./comment-controller";
import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import {ActionType, ANIMATION_DELAY, AUTHORIZATION, FilmStatusMap, URL} from "../constants";
import {renderElement, unrenderElement} from "../utils";

export default class FilmController {
  constructor(container, filmData, onDataChange, onChangeView) {
    this._container = container;
    this._filmData = filmData;
    this._onDataChenge = onDataChange;
    this._onChangeView = onChangeView;
    this._bodyElement = document.body;
    this._filmCard = new FilmCard(this._filmData);
    this._filmDetails = new FilmDetails(this._filmData);
    this._controlButtons = this._filmCard.getElement().querySelector(`.film-card__controls`);
    this._userRatingWrapper = this._filmDetails.getElement().querySelector(`.film-details__user-rating-score`);
    this._filmPopupControls = this._filmDetails.getElement().querySelector(`.film-details__controls`);
    this._filmPopupRatingElements = this._filmDetails.getElement().querySelectorAll(`.film-details__user-rating-input`);
    this._api = new API({authorization: AUTHORIZATION, endPoint: URL});
    this._commentController = new CommentController(this._filmDetails, this._filmData, this._onDataChenge, this._addRequestComment.bind(this), this._deleteRequestComment.bind(this));

    this.init();
  }

  _generateNewData(element, checkedControls) {
    return checkedControls.reduce((acc, curr) => {
      acc[FilmStatusMap[curr]] = true;

      return acc;
    }, {
      isFavorite: false,
      isWatched: false,
      isInWatchlist: false,
    });
  }

  _disableRating() {
    this._filmPopupRatingElements.forEach((input) => {
      input.disabled = true;
    });
  }

  _enableRating() {
    this._filmPopupRatingElements.forEach((input) => {
      input.disabled = false;
    });
  }


  _addRequestComment() {
    this._api.getMovieComments({movieId: this._filmData.id}).then((comments) => {
      this._commentController.enableTextarea();
      this._commentController.hide();
      this._commentController.show(comments);
    });
  }

  _deleteRequestComment() {
    this._api.getMovieComments({movieId: this._filmData.id}).then((comments) => {
      this._commentController.enableDelete();
      this._commentController.hide();
      this._commentController.show(comments);
    });
  }

  _checkedControls() {
    return Array
      .from(this._filmDetails.getElement().querySelectorAll(`.film-details__control-input:checked`))
      .map((control) => control.getAttribute(`name`));
  }


  _getState() {
    return {
      isInWatchlist: this._filmData.isInWatchlist,
      isWatched: this._filmData.isWatched,
      isFavorite: this._filmData.isFavorite,
    };
  }

  _updateRatingRequest() {
    this._enableRating();
  }

  _updateRatingRequestError() {
    this._shakeRating();
    this._ratingShowError();
    this._enableRating();
    this._resetUserRating();
  }

  _ratingShowError() {
    this._filmPopupRatingElements.forEach((input) => {
      input.classList.add(`film-details__user-rating-input--error`);
    });
  }

  _ratingHideErrorClass() {
    this._filmPopupRatingElements.forEach((input) => {
      input.classList.remove(`film-details__user-rating-input--error`);
    });

    this._userRatingWrapper.classList.remove(`shake`);
  }

  _resetUserRating() {
    this._filmPopupRatingElements.forEach((elem) => {
      elem.checked = false;
    });
  }

  _shakeRating() {
    this._userRatingWrapper.classList.add(`shake`);

    setTimeout(() => {
      this._userRatingWrapper.classList.remove(`shake`);
      this._ratingHideErrorClass();
    }, ANIMATION_DELAY);
  }

  _renderComments() {
    this._api.getMovieComments({movieId: this._filmData.id}).then((comments) => {
      this._commentController.show(comments);
    });
  }


  _getPersonalRating() {
    const formData = new FormData(this._filmDetails.getElement().querySelector(`.film-details__inner`));
    return {
      personalRating: formData.get(`score`),
    };
  }


  setDefaultView() {
    if (this._bodyElement.contains(this._filmDetails.getElement())) {
      unrenderElement(this._filmDetails.getElement());
      this._filmDetails.removeElement();
    }
  }

  init() {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        hidePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const hidePopup = () => {
      this._bodyElement.removeChild(this._filmDetails.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const openMoviePopup = (evt) => {
      this._onChangeView();
      this._renderComments();

      if (evt.target.tagName === `A` || evt.target.tagName === `H3` || evt.target.tagName === `IMG`) {
        this._bodyElement.appendChild(this._filmDetails.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onFilmControlClick = (evt) => {
      evt.target.classList.toggle(`film-card__controls-item--active`);

      // Получаем новое состояние фильма
      const getNewState = (state) => {
        // Если фильм был просмотрен  то обнуляем рейтинг
        if (this._filmData.isWatched) {
          this._filmData.personalRating = 0;
        }

        const newState = Object.assign(this._getState(), {[state]: !this._filmData[state]});
        this._onDataChenge(ActionType.UPDATE, Object.assign(this._filmData, newState));
      };

      switch (evt.target.dataset.name) {
        case `isInWatchlist`:
          getNewState(`isInWatchlist`);
          break;
        case `isWatched`:
          getNewState(`isWatched`);
          break;
        case `isFavorite`:
          getNewState(`isFavorite`);
          break;
        default:
          throw new Error(`Incorrect filter`);
      }
    };

    const onUserRatingChange = () => {
      const newData = Object.assign(this._filmData, this._getPersonalRating());

      this._disableRating();
      this._ratingHideErrorClass();
      this._onDataChenge(ActionType.UPDATE_RATING, Object.assign(newData, this._getState()), this._updateRatingRequest.bind(this), this._updateRatingRequestError.bind(this));
    };


    const onDetailedControlClick = (evt) => {
      if (evt.target.name === `watched`) {
        const isWatched = !this._filmData.isWatched;

        if (isWatched === false) {
          this._resetUserRating();
        }

        this._filmDetails.getElement().querySelector(`.form-details__middle-container`).classList.toggle(`visually-hidden`);

        const newState = Object.assign(this._getState(), {isWatched});
        const newData = Object.assign(this._filmData, {personalRating: 0});
        this._onDataChenge(ActionType.UPDATE, Object.assign(newData, newState));
      } else {

        // Генерация обьекта новых стейтов для фильма
        const newData = this._generateNewData(this._filmDetails.getElement(), this._checkedControls());
        this._onDataChenge(ActionType.UPDATE, Object.assign(this._filmData, newData));
      }
    };


    const onUserRatingReset = () => {
      this._resetUserRating();

      const newData = Object.assign(this._filmData, {personalRating: 0});
      this._onDataChenge(ActionType.UPDATE, Object.assign(newData, this._getState()));
    };


    // Закрытие попапа по клику на крестик
    this._filmDetails.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {
        hidePopup();
      });


    // Открытие попапа по клику на карточку
    this._filmCard.getElement()
      .addEventListener(`click`, openMoviePopup);


    // Килик по контролам фильма на главной
    this._controlButtons
      .addEventListener(`click`, onFilmControlClick);

    // Изменения рейтинга
    this._filmDetails.getElement().querySelectorAll(`.film-details__user-rating-input`)
      .forEach((input) => {
        input.addEventListener(`click`, onUserRatingChange);
      });

    // Клик по контролам попапа
    this._filmPopupControls
      .addEventListener(`change`, onDetailedControlClick);

    // Клик по сбросу рейтинга
    this._filmDetails.getElement().querySelector(`.film-details__watched-reset`)
      .addEventListener(`click`, onUserRatingReset);

    renderElement(this._container.getElement().querySelector(`.films-list__container`), this._filmCard.getElement());
  }
}
