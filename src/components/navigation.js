import AbstractComponent from "./absctract-component";

export default class Navigation extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getFilterTemplate({title, count}) {
    return `
        <a href="#${title}" class="main-navigation__item">
          ${title} <span class="main-navigation__item-count">${count}</span>
        </a>
      `.trim();
  }

  getFiltersTemplate(filters) {
    return filters.map((filter) => this.getFilterTemplate(filter)).join(``);
  }

  getTemplate() {
    return `
      <nav class="main-navigation">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${this.getFiltersTemplate(this._filters)}
      </nav>
    `.trim();
  }
}
