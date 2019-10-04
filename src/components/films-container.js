import AbstractComponent from "./absctract-component";

export default class FilmsContainer extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
