import AbstractComponent from "./absctract-component";

export class NoSearchResult extends AbstractComponent {
  getTemplate() {
    return `
      <div class="no-result">There is no movies for your request.</div>
    `.trim();
  }
}
