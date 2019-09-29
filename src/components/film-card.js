import AbstractComponent from "./absctract-component";
import moment from "moment";
import {clipDescription, formatFilmDuration} from "../utils";

class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._comments = film.comments;
    this._description = film.description;
    this._genres = film.genres;
    this._image = film.image;
    this._isFavorite = film.isFavorite;
    this._isInWatchlist = film.isInWatchlist;
    this._isWatched = film.isWatched;
    this._rating = film.rating;
    this._releaseDate = film.releaseDate;
    this._runtime = formatFilmDuration(film.runtime);
    this._title = film.title;
  }

  _addActiveClass(isActive) { // Возврат активного класса
    return `${isActive ? `film-card__controls-item--active` : ``}`;
  }

  _getFirstGenre(genres) { // Первый жанр из множества
    return genres.values().next().value;
  }

  getTemplate() {
    return `
      <article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${moment(this._releaseDate).format(`YYYY`)}</span>
          <span class="film-card__duration">${this._runtime.hours}h ${this._runtime.minutes}m</span>
          <span class="film-card__genre">${this._getFirstGenre(this._genres)}</span>
        </p>
        <img src="./${this._image}" alt="some placeholder" class="film-card__poster">
        <p class="film-card__description">${clipDescription(this._description)}</p>
        <a class="film-card__comments">${this._comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._addActiveClass(this._isInWatchlist)}" data-name="watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._addActiveClass(this._isWatched)}" data-name="watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${this._addActiveClass(this._isFavorite)}" data-name="favorite">Mark as favorite</button>
        </form>
      </article>
    `.trim();
  }
}

export default FilmCard;
