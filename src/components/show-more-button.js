import AbstractComponent from "./absctract-component";

export default class ShowMoreButton extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <button class="films-list__show-more">Show more</button>
    `.trim();
  }
}
