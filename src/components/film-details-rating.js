import AbstractComponent from "./absctract-component";
import {USER_SCORE_AMOUNT} from "../constants";

export default class FilmDetailsRating extends AbstractComponent {
  constructor({title, image, personalRating}) {
    super();
    this._title = title;
    this._image = image;
    this._personalRating = personalRating;
  }

  _getUserScoreTemplate() {
    return Array.from(Array(USER_SCORE_AMOUNT), (currentValue, index) => {
      return `
         <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${index + 1}" id="rating-${index + 1}" ${(this._personalRating) === (index + 1) ? `checked` : ``}> 
         <label class="film-details__user-rating-label" for="rating-${index + 1}">${index + 1}</label>
       `.trim();
    }).join(``);
  }

  getTemplate() {
    return `
      <div class="form-details__middle-container">
        <section class="film-details__user-rating-wrap">
          <div class="film-details__user-rating-controls">
            <button class="film-details__watched-reset" type="button">Undo</button>
          </div>

          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="./${this._image}" alt="film-poster" class="film-details__user-rating-img">
            </div>

            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">${this._title}</h3>

              <p class="film-details__user-rating-feelings">How you feel it?</p>

              <div class="film-details__user-rating-score">
                ${this._getUserScoreTemplate()}
              </div>
            </section>
          </div>
        </section>
      </div>
    `.trim();
  }
}
