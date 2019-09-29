import AbstractComponent from "./absctract-component";

class FilmsNoResult extends AbstractComponent {
  getTemplate() {
    return `
      <div class="no-result">There is no movies for your request.</div>
    `.trim();
  }
}

export default FilmsNoResult;
