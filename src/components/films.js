import AbstractComponent from "./absctract-component";
import ShowMoreButton from "./show-more-button";

export default class Films extends AbstractComponent {
  constructor() {
    super();
    this._moreButtonTemplate = new ShowMoreButton().getTemplate();
  }

  getTemplate() {
    return `<section class="films"></section>`;
  }
}
