import FilmDetailsRating from "./film-details-rating";
import AbstractComponent from "./absctract-component";
import moment from "moment";
import {formatFilmDuration, isChecked} from "../utils";
import {MIN_GENRE_AMOUNT} from "../constants";

export default class FilmDetails extends AbstractComponent {
  constructor(film) {
    super();
    this._actors = film.actors;
    this._age = film.age;
    this._country = film.country;
    this._description = film.description;
    this._director = film.director;
    this._genres = film.genres;
    this._image = film.image;
    this._isFavorite = film.isFavorite;
    this._isInWatchlist = film.isInWatchlist;
    this._isWatched = film.isWatched;
    this._originalTitle = film.originalTitle;
    this._rating = film.rating;
    this._releaseDate = film.releaseDate;
    this._runtime = formatFilmDuration(film.runtime);
    this._title = film.title;
    this._writers = film.writers;
    this._personalRating = film.personalRating;
    this._movieRatingInstance = new FilmDetailsRating({
      image: this._image,
      title: this._title,
      personalRating: this._personalRating,
      isWatched: this._isWatched,
    });
  }

  // Получаем разметку жанров
  get genresTemplate() {
    const genresTemplate = [];

    this._genres.forEach((genre) => {
      genresTemplate.push(`<span class="film-details__genre">${genre}</span>`);
    });

    return genresTemplate;
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
                <img class="film-details__poster-img" src="${this._image}" alt="${this._title}">

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
                    <p class="film-details__user-rating">${this._getPersonalRatingTemplate()}</p>
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
                    <td class="film-details__term">
                      ${this._getGenreTitle()}
                    </td>
                    
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

          ${this._movieRatingInstance.getTemplate()}
          
          <div class="form-details__bottom-container"></div>
        </form>
      </section>
    `.trim();
  }

  // Получаем разметку рейтинга
  _getPersonalRatingTemplate() {
    return this._personalRating ? `Your rate  ${this._personalRating.toString()}` : ``;
  }

  // Получаем разметку загловка рейтингов
  _getGenreTitle() {
    return this._genres.size > MIN_GENRE_AMOUNT ? `Genres` : `Genre`;
  }
}
