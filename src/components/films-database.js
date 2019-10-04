import AbstractComponent from "./absctract-component";

export default class FilmsDatabase extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <div class="no-result">There are no movies in our database.</div>
    `.trim();
  }
}
