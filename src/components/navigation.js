import AbstractComponent from "./absctract-component";

export default class Navigation extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  get filtersTemplate() {
    const getFilterTemplate = ({title, count}) => {
      return `
        <a href="#${title}" class="main-navigation__item">
          ${title} <span class="main-navigation__item-count">${count}</span>
        </a>
      `.trim();
    };

    return this._filters.map((filter) => getFilterTemplate(filter)).join(``);
  }

  getTemplate() {
    return `
      <nav class="main-navigation">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${this.filtersTemplate}
        <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
      </nav>
    `.trim();
  }
}
