import AbstractComponent from "./absctract-component";

export default class FilmsListCommented extends AbstractComponent {
  getTemplate() {
    return `
      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
        
        <div class="films-list__container"></div>
      </section>`.trim();
  }
}
