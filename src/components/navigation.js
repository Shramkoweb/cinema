import {createElement} from "../util";

export default class Navigation {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    const getFilterTemplate = ({title, count}) => {
      return `
        <a href="#${title}" class="main-navigation__item">
          ${title} <span class="main-navigation__item-count">${count}</span>
        </a>
      `.trim();
    };

    const getFiltersTemplate = (filters) => {
      return filters.map((filter) => getFilterTemplate(filter)).join(``);
    };

    return `
      <nav class="main-navigation">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${getFiltersTemplate(this._filters)}
      </nav>
    `.trim();
  }
}
