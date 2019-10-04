import FilmDetailComments from "../components/film-detail-comments";
import {ActionType} from "../constants";
import {renderElement, unrenderElement} from "../utils";

export default class CommentController {
  constructor(filmDetails, filmData, onDataChange, addRequest, deleteRequest) {
    this._addRequest = addRequest;
    this._comments = [];
    this._commentsWrapper = null;
    this._commentTextarea = null;
    this._deleteRequest = deleteRequest;
    this._filmData = filmData;
    this._filmDetails = filmDetails;
    this._bottomContainer = this._filmDetails.getElement().querySelector(`.form-details__bottom-container`);
    this._onDataChenge = onDataChange;
  }

  show(comments) {
    if (this._commentsWrapper !== null) {
      this.hide();
    }

    this._comments = comments;
    this._commentsWrapper = new FilmDetailComments({comments: this._comments});
    this._commentTextarea = this._commentsWrapper.getElement().querySelector(`.film-details__comment-input`);
    this._init();
  }

  disableTextarea() {
    this._commentTextarea.disabled = true;
  }

  enableTextarea() {
    this._commentTextarea.disabled = false;
  }

  hide() {
    unrenderElement(this._commentsWrapper.getElement());
    this._commentsWrapper.removeElement();
  }

  enableDelete() {
    this._commentsWrapper.getElement().querySelectorAll(`.film-details__comment-delete`)
      .forEach((button) => {
        button.textContent = `Delete`;
        button.disabled = false;
      });
  }

  disableDelete(evt) {
    evt.target.disabled = true;
    evt.target.textContent = `Deleting...`;
  }

  _getCommentsData() {
    const formData = new FormData(this._filmDetails.getElement().querySelector(`.film-details__inner`));
    return {
      comment: {
        emotion: formData.get(`comment-emoji`) !== null ? formData.get(`comment-emoji`) : `smile`,
        comment: formData.get(`comment`),
        date: new Date(Date.now()),
      },
    };
  }

  _init() {
    this._commentsWrapper.getElement().querySelector(`.film-details__add-emoji-label`)
      .innerHTML = `<img src="./images/emoji/smile.png" width="55" height="55" alt="Smile emoji">`;


    const onCommentKeyDown = (evt) => {
      const isRequiredKeys = (evt.ctrlKey || evt.metaKey) && evt.key === `Enter`;

      if (isRequiredKeys && evt.target.value !== ``) {
        const formData = this._getCommentsData();
        this.disableTextarea();
        this._onDataChenge(ActionType.CREATE_COMMENT, {
          id: this._filmData.id,
          comment: formData.comment,
        }, this._addRequest);
      }
    };

    const onTextareaFocus = () => {
      document.addEventListener(`keydown`, onCommentKeyDown);
    };

    const onTextareaBlur = () => {
      document.removeEventListener(`keydown`, onCommentKeyDown);
    };

    const onDeleteButtonClick = (evt, id) => {
      evt.preventDefault();
      this.disableDelete(evt);
      this._onDataChenge(ActionType.DELETE_COMMENT, {id: this._comments[id].id}, this._deleteRequest);
    };

    const onSelectEmojiClick = (evt) => {
      this._commentsWrapper.getElement()
        .querySelector(`.film-details__add-emoji-label`).innerHTML = `<img src="images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji">`;
    };

    this._commentsWrapper.getElement().querySelectorAll(`.film-details__comment-delete`)
      .forEach((element, id) => {
        element.addEventListener(`click`, (evt) => onDeleteButtonClick(evt, id));
      });

    this._commentsWrapper.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`focus`, onTextareaFocus);

    this._commentsWrapper.getElement().querySelectorAll(`.film-details__emoji-item`)
      .forEach((elem) => {
        elem.addEventListener(`click`, onSelectEmojiClick);
      });

    this._commentsWrapper.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`blur`, onTextareaBlur);


    renderElement(this._bottomContainer, this._commentsWrapper.getElement());
  }
}
