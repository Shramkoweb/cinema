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
          
          ${this._hasFilms ? `<div class="films-list__container"></div>` : `<div class="no-result">There are no movies in our database.</div>`}

        </section>
        
        ${this._hasFilms ? `
            <section class="films-list--extra">
              <h2 class="films-list__title">Top rated</h2>
        
              <div class="films-list__container films-list__container--rated"></div>
            </section>
        
            <section class="films-list--extra">
              <h2 class="films-list__title">Most commented</h2>
        
              <div class="films-list__container films-list__container--commented"></div>
            </section>
          ` : ``}
      </section>
    `.trim();
  }
}
