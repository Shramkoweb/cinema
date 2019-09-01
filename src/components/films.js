import AbstractComponent from "./absctract-component";

export default class Films extends AbstractComponent {
  constructor(hasFilms) {
    super();
    this._hasFilms = hasFilms;
  }

  getTemplate() {
    return `
      <section class="films">
        <section class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
          
          ${this._hasFilms ? `<div class="films-list__container"></div>` : ``}
        </section>
      </section>
    `.trim();
  }
}
