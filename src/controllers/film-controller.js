import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import {renderElement, unrenderElement} from "../utils";
import API from "../api";
import {ActionType, AUTHORIZATION, FilmStatusMap, URL} from "../constants";
import CommentController from "./comment-controller";

export default class FilmController {
  // constructor(container, data, onDataChange, onChangeView) {
  //   this._container = container;
  //   this._data = data;
  //   this._film = new FilmCard(data);
  //   this._filmPopup = new FilmDetails(data);
  //   this._onDataChange = onDataChange;
  //   this._onChangeView = onChangeView;
  //   this._bodyElement = document.body;
  //   this._controlButtons = this._film.getElement().querySelector(`.film-card__controls`);
  //   this._filmPopupControls = this._filmPopup.getElement().querySelector(`.film-details__controls`);
  //   this._filmStatusMap = {
  //     watched: `isWatched`,
  //     watchlist: `isInWatchlist`,
  //     favorite: `isFavorite`,
  //   };
  //
  //   this.init();
  // }
  //
  // checkedControls() {
  //   return Array
  //     .from(this._filmPopup.getElement().querySelectorAll(`.film-details__control-input:checked`))
  //     .map((control) => control.getAttribute(`name`));
  // }
  //
  // // set default statement
  // setDefaultView() {
  //   if (document.body.contains(this._filmPopup.getElement())) {
  //     unrenderElement(this._filmPopup.getElement());
  //     this._filmPopup.removeElement();
  //   }
  // }
  //
  // init() {
  //   const onMoviePopUpEscPress = (evt) => isEscKeyDown(evt, closeMoviePopUp);
  //
  //   const closeMoviePopUp = () => {
  //     this._bodyElement.removeChild(this._filmPopup.getElement());
  //     document.removeEventListener(`keydown`, onMoviePopUpEscPress);
  //   };
  //
  //   const openMoviePopup = (evt) => {
  //   //     this._onChangeView();
  //   //
  //   //     if (evt.target.tagName === `A` || evt.target.tagName === `H3` || evt.target.tagName === `IMG`) {
  //   //       this._bodyElement.appendChild(this._filmPopup.getElement());
  //   //       document.addEventListener(`keydown`, onMoviePopUpEscPress);
  //   //     }
  //   //   };
  //
  //   this._film.getElement()
  //     .addEventListener(`click`, openMoviePopup);
  //

  //
  //   this._filmPopup.getElement().querySelector(`textarea`)
  //     .addEventListener(`focus`, () => {
  //       document.removeEventListener(`keydown`, onMoviePopUpEscPress);
  //     });
  //
  //   this._filmPopup.getElement().querySelector(`textarea`)
  //     .addEventListener(`blur`, () => {
  //       document.addEventListener(`keydown`, onMoviePopUpEscPress);
  //     });
  //
  //   // Click on film card controls
  //   const onFilmControlClick = (evt) => {
  //     evt.target.classList.toggle(`film-card__controls-item--active`);
  //
  //     const checkedControls = Array
  //       .from(this._controlButtons.querySelectorAll(`.film-card__controls-item--active`))
  //       .map((control) => control.getAttribute(`data-name`));
  //
  //
  //
  //     const newData = this.generateNewData(this._filmPopup.getElement(), checkedControls);
  //     this._onDataChange(ActionType.UPDATE, Object.assign(this._data, newData));
  //   };
  //
  //   // click on delete comment in popup
  //   const onCommentDelete = (evt) => {
  //     evt.preventDefault();
  //
  //     const newData = this.generateNewData(this._filmPopup.getElement(), this.checkedControls());
  //
  //     this._onDataChange(ActionType.UPDATE, Object.assign(this._data, newData));
  //   };
  //
  //   for (const deleteButton of this._filmPopup.getElement().querySelectorAll(`.film-details__comment-delete`)) {
  //     deleteButton.addEventListener(`click`, onCommentDelete);
  //   }
  //
  //   // Click on film popup controls
  //   const onDetailedControlClick = () => {
  //     const newData = this.generateNewData(this._filmPopup.getElement(), this.checkedControls());
  //
  //     this._onDataChange(ActionType.UPDATE, Object.assign(this._data, newData));
  //   };
  //
  //   const onCommentSubmit = (evt) => {
  //     const isRequiredKeys = (evt.ctrlKey || evt.metaKey) && evt.key === `Enter`;
  //     const hasSelectedEmoji = this._filmPopup.getElement().querySelector(`.film-details__add-emoji-label`).querySelector(`img`);
  //
  //     if (isRequiredKeys && hasSelectedEmoji) {
  //       const newData = this.generateNewData(this._filmPopup.getElement(), this.checkedControls());
  //
  //       this._onDataChange(ActionType.UPDATE, Object.assign(this._data, newData));
  //     }
  //   };
  //
  //   // Comment field element
  //   const commentField = this._filmPopup.getElement().querySelector(`.film-details__comment-input`);
  //
  //   // events on comment input
  //   commentField.addEventListener(`focus`, () => {
  //     commentField.addEventListener(`keydown`, onCommentSubmit);
  //     document.removeEventListener(`keydown`, onMoviePopUpEscPress);
  //   });
  //
  //   commentField.addEventListener(`blur`, () => {
  //     commentField.removeEventListener(`keydown`, onCommentSubmit);
  //     document.addEventListener(`keydown`, onMoviePopUpEscPress);
  //   });
  //
  //   this._controlButtons.addEventListener(`click`, onFilmControlClick);
  //   this._filmPopupControls.addEventListener(`change`, onDetailedControlClick);
  //
  //   renderElement(this._container, this._film.getElement());
  // }
  //
  // function for generated new data
  constructor(container, filmData, onDataChange, onChangeView) {
    this._container = container;
    this._filmData = filmData;
    this._onDataChenge = onDataChange;
    this._onChangeView = onChangeView;
    this._bodyElement = document.body;
    this._filmCard = new FilmCard(this._filmData);
    this._filmDetails = new FilmDetails(this._filmData);
    this._controlButtons = this._filmCard.getElement().querySelector(`.film-card__controls`);
    this._filmPopupControls = this._filmDetails.getElement().querySelector(`.film-details__controls`);
    this._filmPopupRatingElements = this._filmDetails.getElement().querySelectorAll(`.film-details__user-rating-input`);
    this._api = new API({authorization: AUTHORIZATION, endPoint: URL});
    this._commentController = new CommentController(this._filmDetails, this._filmData, this._onDataChenge, this._addRequestComment.bind(this), this._deleteRequestComment.bind(this));
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

  _addRequestComment() {
    this._api.getMovieComments({movieId: this._filmData.id}).then((comments) => {
      this._commentController.enableTextarea();
      this._commentController.hide();
      this._commentController.show(comments);
    }).catch(() => {
      this._commentController.enableTextarea();
    });
  }

  _deleteRequestComment() {
    this._api.getMovieComments({movieId: this._filmData.id}).then((comments) => {
      this._commentController.enableDelete();
      this._commentController.hide();
      this._commentController.show(comments);
    }).catch(() => {
      this._commentController.enableDelete();
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

    const resetUserRating = () => {
      this._filmPopupRatingElements.forEach((elem) => {
        elem.checked = false;
      });
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
      this._onDataChenge(ActionType.UPDATE_RATING, Object.assign(newData, this._getState()));
    };


    const onDetailedControlClick = (evt) => {
      if (evt.target.name === `watched`) {
        const isWatched = !this._filmData.isWatched;

        if (isWatched === false) {
          resetUserRating();
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
      resetUserRating();
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
      .forEach((elem) => {
        elem.addEventListener(`click`, onUserRatingChange);
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
