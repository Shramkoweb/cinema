import ShowMoreButton from "./show-more-button";
import {createElement} from "../util";

export default class Movies {
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
    return `
      <section class="films">
        <section class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      
          <div class="films-list__container"></div>
           
           ${ShowMoreButton.getTemplate()}
        </section>
      
        <section class="films-list--extra">
          <h2 class="films-list__title">Top rated</h2>
      
          <div class="films-list__container"></div>
        </section>
      
        <section class="films-list--extra">
          <h2 class="films-list__title">Most commented</h2>
      
          <div class="films-list__container"></div>
        </section>
      </section>
    `.trim();
  }

  static getMostCommentedMovies(movies, count = 2) {
    const moviesCopy = [...movies];
    moviesCopy.sort((a, b) => a.comments - b.comments);

    return moviesCopy.slice(-count);
  }

  static getMostRatedMovies(movies, count = 2) {
    const moviesCopy = [...movies];
    moviesCopy.sort((a, b) => a.rating - b.rating);

    return moviesCopy.slice(-count);
  }
}
