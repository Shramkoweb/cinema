import AbstractComponent from "./absctract-component";
import {getDurationOfWatchedFilms, getFavoriteGenre, getUserRating, getWatchedMoviesAmount} from "../util";

export default class Statistics extends AbstractComponent {
  constructor(movies) {
    super();
    this._rank = getUserRating(movies);
    this._watchedMovies = getWatchedMoviesAmount(movies);
    this._totalDuration = getDurationOfWatchedFilms(movies);
    this._favoriteGenre = getFavoriteGenre(movies);
  }

  hide() {
    this.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this.getElement().classList.remove(`visually-hidden`);
  }

  getTemplate() {
    return `
      <section class="statistic visually-hidden">
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">${this._rank}</span>
        </p>
    
        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>
    
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>
    
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
          <label for="statistic-today" class="statistic__filters-label">Today</label>
    
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
          <label for="statistic-week" class="statistic__filters-label">Week</label>
    
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
          <label for="statistic-month" class="statistic__filters-label">Month</label>
    
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
          <label for="statistic-year" class="statistic__filters-label">Year</label>
        </form>
    
        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">${this._watchedMovies} <span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">${this._totalDuration.hours} <span class="statistic__item-description">h</span> ${this._totalDuration.minutes} <span class="statistic__item-description">m</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${this._favoriteGenre}</p>
          </li>
        </ul>
    
        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>
      </section>
    `.trim();
  }
}
