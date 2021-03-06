import AbstractComponent from "./absctract-component";

export default class Result extends AbstractComponent {
  constructor(amount) {
    super();
    this._amount = amount;
  }

  getTemplate() {
    return `
      <div class="result">
        <p class="result__text">Result <span class="result__count">${this._amount}</span></p>
       </div>
    `.trim();
  }
}
