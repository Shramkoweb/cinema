import AbstractComponent from "./absctract-component";
import {formatFilmDuration} from "../util";
import moment from "moment";

export default class FilmCard extends AbstractComponent {
  constructor({title, rating, releaseDate, runtime, genres, image, description, comments, isFavorite, isWatched, isInWatchlist}) {
    super();
    this._title = title;
    this._rating = rating;
    this._releaseDate = releaseDate;
    this._runtime = formatFilmDuration(runtime);
    this._genres = genres;
    this._image = image;
    this._description = description;
    this._comments = comments;
    this._isFavorite = isFavorite;
    this._isWatched = isWatched;
    this._isInWatchlist = isInWatchlist;
  }

  /* return active class  */
  addActiveClass(isActive) {
    return `${isActive ? `film-card__controls-item--active` : ``}`;
  }

  getTemplate() {
    return `
      <article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${moment(this._releaseDate).format(`YYYY`)}</span>
          <span class="film-card__duration">${this._runtime.hours}h ${this._runtime.minutes}m</span>
          <span class="film-card__genre">${this._genres.values().next().value}</span>
        </p>
        <img src="./images/posters/${this._image}" alt="some placeholder" class="film-card__poster">
        <p class="film-card__description">${this._description}</p>
        <a class="film-card__comments">${this._comments.length} comments</a>
        <form class="film-card__controls">
          <button type="button" class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this.addActiveClass(this._isInWatchlist)}" data-name="watchlist">Add to watchlist</button>
          <button type="button" class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this.addActiveClass(this._isWatched)}" data-name="watched">Mark as watched</button>
          <button type="button" class="film-card__controls-item button film-card__controls-item--favorite ${this.addActiveClass(this._isFavorite)}" data-name="favorite">Mark as favorite</button>
        </form>
      </article>
    `.trim();
  }
}
