import AbstractComponent from "./absctract-component";
import ShowMoreButton from "./show-more-button";

export default class Movies extends AbstractComponent {
  constructor() {
    super();
    this._moreButtonTemplate = new ShowMoreButton().getTemplate();
  }

  getTemplate() {
    return `
      <section class="films">
        <section class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      
          <div class="films-list__container"></div>           
        </section>
        
        ${this._moreButtonTemplate}

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
}
