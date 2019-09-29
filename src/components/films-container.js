import AbstractComponent from "./absctract-component";

class FilmsContainer extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}

export default FilmsContainer;
