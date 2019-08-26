/* Получаем рейтинг пользователя */
import {createElement} from "../util";

export default class Profile {
  constructor(movies) {
    this._element = null;
    this._movies = movies;
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
    const getUserRating = (movies) => {
      let watchedMovies = 0;
      movies.forEach((movie) => {
        if (movie.isWatched) {
          watchedMovies++;
        }
      });

      const getUserTitle = (moviesWatched) => {
        let userTitle = ``;
        if (moviesWatched >= 21) {
          userTitle = `Movie Buff`;
        } else if (moviesWatched >= 11) {
          userTitle = `fan`;
        } else if (moviesWatched > 0) {
          userTitle = `novice`;
        }
        return userTitle;
      };

      return getUserTitle(watchedMovies);
    };
    return `
      <section class="header__profile profile">
        <p class="profile__rating">${getUserRating(this._movies)}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>
    `.trim();
  }
}
