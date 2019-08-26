import {createElement} from "../util";

export default class Movie {
  constructor({title, rating, releaseDate, runtime, genres, image, description, comments, isFavorite, isWatched, isInWatchlist}) {
    this._element = null;
    this._title = title;
    this._rating = rating;
    this._releaseDate = releaseDate;
    this._runtime = runtime;
    this._genres = genres;
    this._image = image;
    this._description = description;
    this._comments = comments;
    this._isFavorite = isFavorite;
    this._isWatched = isWatched;
    this._isInWatchlist = isInWatchlist;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    /* Получаем год из даты */
    const getMovieYear = (date) => {
      return new Date(date).getFullYear();
    };

    /* Возврат активного класса для елемента */
    const elementAddActiveClass = (isActive) => {
      return `${isActive ? `active` : ``}`;
    };

    return `
      <article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${getMovieYear(this._releaseDate)}</span>
          <span class="film-card__duration">${Movie.getMovieDuration(this._runtime)}</span>
          <span class="film-card__genre">${[...this._genres][0]}</span>
        </p>
        <img src="./images/posters/${this._image}" alt="" class="film-card__poster">
        <p class="film-card__description">${this._description}</p>
        <a class="film-card__comments">${this._comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--${elementAddActiveClass(this._isInWatchlist)}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--${elementAddActiveClass(this._isWatched)}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--${elementAddActiveClass(this._isFavorite)}">Mark as favorite</button>
        </form>
      </article>
    `.trim();
  }

  static getMovieDuration(duration) {
    const UNITS = {
      MINUTES_IN_HOUR: 60,
    };
    const hours = duration / UNITS.MINUTES_IN_HOUR;
    const roundedHours = Math.floor(hours);
    const roundedMinutes = Math.round((hours - roundedHours) * UNITS.MINUTES_IN_HOUR);

    return `${roundedHours}h ${roundedMinutes}m`;
  }
}
