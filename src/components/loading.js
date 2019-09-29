import AbstractComponent from "./absctract-component";

class Loading extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <div class="no-result">Loading…</div>
    `.trim();
  }
}

export default Loading;
