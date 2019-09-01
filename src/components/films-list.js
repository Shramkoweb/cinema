import AbstractComponent from "./absctract-component";

export default class FilmsList extends AbstractComponent {
  constructor(hasFilms) {
    super();
    this._hasFilms = hasFilms;
  }

  getTemplate() {
    return `
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        
        ${this._hasFilms ? `<div class="films-list__container"></div>` : ``}
      </section>
    `.trim();
  }
}
