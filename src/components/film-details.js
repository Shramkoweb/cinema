import {formatFilmDuration, isChecked} from "../util";
import FilmDetailsRating from "./film-details-rating";
import AbstractComponent from "./absctract-component";
import moment from "moment";

const EMOJI_WIDTH = 55;
const EMOJI_HEIGHT = 55;

export default class FilmDetails extends AbstractComponent {
  constructor({title, rating, releaseDate, director, writers, genres, actors, age, originalTitle, country, isFavorite, isWatched, isInWatchlist, runtime, image, description, comments}) {
    super();
    this._title = title;
    this._rating = rating;
    this._director = director;
    this._writers = writers;
    this._actors = actors;
    this._releaseDate = releaseDate;
    this._runtime = formatFilmDuration(runtime);
    this._originalTitle = originalTitle;
    this._country = country;
    this._genres = genres;
    this._age = age;
    this._image = image;
    this._description = description;
    this._comments = comments;
    this._isFavorite = isFavorite;
    this._isWatched = isWatched;
    this._isInWatchlist = isInWatchlist;
    this._movieRatingInstance = new FilmDetailsRating({title, image});

    this.addEventListeners();
  }

  // get movie rating template if movie is watched
  get movieRatingTemplate() {
    return this._isWatched ? this._movieRatingInstance.getTemplate() : ``;
  }

  // getting genres template from Set of genres
  get genresTemplate() {
    const genresTemplate = [];

    this._genres.forEach((genre) => {
      genresTemplate.push(`<span class="film-details__genre">${genre}</span>`);
    });

    return genresTemplate;
  }

  // get comment list from array of comments
  get commentList() {
    return this._comments.map((comment) => this.getCommentTemplate(comment)).join(``);
  }

  getCommentTemplate({author, date, comment, emoji}) {
    return `
        <li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji" data-name="${emoji}">
          </span>
          <div>
            <p class="film-details__comment-text">${comment}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${moment(date).fromNow()}</span>
              <button type="button" class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>
      `.trim();
  }

  getTemplate() {
    return `
      <section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="./images/posters/${this._image}" alt="${this._title}">
      
                <p class="film-details__age">${this._age}+</p>
              </div>
      
              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${this._title}</h3>
                    <p class="film-details__title-original">Original: ${this._originalTitle}</p>
                  </div>
      
                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${this._rating}</p>
                  </div>
                </div>
      
                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${this._director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">${this._writers.join(`, `)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${this._actors.join(`, `)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${moment(this._releaseDate).format(`DD MMMM YYYY`)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${this._runtime.hours}h ${this._runtime.minutes}m</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${this._country}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Genres</td>
                    <td class="film-details__cell">
                      ${this.genresTemplate.join(``)}
                    </td>
                  </tr>
                </table>
      
                <p class="film-details__film-description">
                ${this._description}
                </p>
              </div>
            </div>
      
            <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isChecked(this._isInWatchlist)}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
      
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isChecked(this._isWatched)}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
      
              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isChecked(this._isFavorite)}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </section>
          </div>
          
          ${this.movieRatingTemplate}
                    
          <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>
      
              <ul class="film-details__comments-list">
                ${this.commentList}
              </ul>
      
              <div class="film-details__new-comment">
                <div class="film-details__add-emoji-label film-details__add-emoji-label--incorrect"></div>
      
                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                </label>
      
                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>
      
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>
      
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                  <label class="film-details__emoji-label" for="emoji-puke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>
      
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
              </div>
            </section>
          </div>
        </form>
      </section>
    `.trim();
  }

  addEventListeners() {
    const onWatchedControlClick = (evt) => {
      if (evt.target.checked) {
        const filmInfo = this.getElement().querySelector(`.form-details__top-container`);
        const filmRatingTemplate = new FilmDetailsRating({title: this._title, image: this._image}).getTemplate();
        filmInfo.insertAdjacentHTML(`afterend`, filmRatingTemplate);
      } else {
        this.getElement().querySelector(`.form-details__middle-container`).remove();
      }
    };

    // delete comment event
    const onCommentDelete = (evt) => {
      evt.preventDefault();

      evt.target.closest(`.film-details__comment`).remove();
      const commentsCount = parseInt(this.getElement().querySelector(`.film-details__comments-count`).textContent, 10);

      this.getElement().querySelector(`.film-details__comments-count`).textContent = commentsCount - 1;
    };


    // submit comment event
    const onCommentSubmit = (evt) => {
      if (evt.ctrlKey && evt.key === `Enter`) {
        const emojiBlock = this.getElement().querySelector(`.film-details__add-emoji-label`);
        if (!emojiBlock.querySelector(`img`)) {
          emojiBlock.classList.add(`film-details__add-emoji-label--error`);

          return;
        }

        const commentsCount = parseInt(this.getElement().querySelector(`.film-details__comments-count`).textContent, 10);
        const commentsList = document.querySelector(`.film-details__comments-list`);
        const comment = {
          author: `Serhii Shramko`,
          comment: this.getElement().querySelector(`.film-details__comment-input`).value,
          emoji: this.getElement().querySelector(`.film-details__add-emoji-label`).querySelector(`img`).getAttribute(`data-name`),
          date: new Date(),
        };

        commentsList.insertAdjacentHTML(`beforeend`, this.getCommentTemplate(comment));

        this.getElement().querySelector(`.film-details__comments-count`).textContent = commentsCount + 1;

        // add listeners for all delete button in comment element
        for (const deleteButton of this.getElement().querySelectorAll(`.film-details__comment-delete`)) {
          deleteButton.addEventListener(`click`, onCommentDelete);
        }


        // default state
        this.getElement().querySelector(`.film-details__comment-input`).value = ``;
        this.getElement().querySelector(`.film-details__emoji-item:checked`).checked = false;
      }
    };

    // Comment field events
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`focus`, () => {
      this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, onCommentSubmit);
    });

    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`blur`, () => {
      this.getElement().querySelector(`.film-details__comment-input`).removeEventListener(`keydown`, onCommentSubmit);
    });

    // click on Emoji event
    const onEmojiClick = (evt) => {
      if (evt.target.tagName === `INPUT`) {
        const emojiBlock = this.getElement().querySelector(`.film-details__add-emoji-label`);
        emojiBlock.classList.remove(`film-details__add-emoji-label--incorrect`);
        emojiBlock.innerHTML = ``;

        const emojiElement = document.createElement(`img`);
        emojiElement.width = EMOJI_WIDTH;
        emojiElement.height = EMOJI_HEIGHT;
        emojiElement.alt = `emoji`;
        emojiElement.src = `images/emoji/${evt.target.value}.png`;
        emojiElement.setAttribute(`data-name`, evt.target.value);

        emojiBlock.insertAdjacentElement(`beforeend`, emojiElement);
      }
    };

    // add listeners for all delete button in comment element
    for (const deleteButton of this.getElement().querySelectorAll(`.film-details__comment-delete`)) {
      deleteButton.addEventListener(`click`, onCommentDelete);
    }

    this.getElement().querySelector(`.film-details__control-input[name="watched"]`).addEventListener(`change`, onWatchedControlClick);
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, onEmojiClick);
  }
}
