import AbstractComponent from "./absctract-component";

export default class Loading extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <div class="no-result">Loading…</div>
    `.trim();
  }
}
