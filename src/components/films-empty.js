import AbstractComponent from "./absctract-component";

class FilmsEmpty extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <div class="no-result">There are no movies in our database.</div>
    `.trim();
  }
}

export default FilmsEmpty;
