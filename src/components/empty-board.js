import {createElement} from "../util";

export default class EmptyBoard {
  constructor() {
    this._element = null;
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
          
           <div class="no-result">
            There are no movies.
          </div>
        </section>
      </section>
    `.trim();
  }
}
