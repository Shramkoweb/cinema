import {STATISTIC_FILTERS} from "../constants";
import AbstractComponent from "./absctract-component";

class Statistics extends AbstractComponent {
  _getFiltersTemplate() {
    STATISTIC_FILTERS.map((filter) => {
      return `
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filter.id}" value="${filter.id}" ${filter.checked ? `checked` : ``}>
        <label for="statistic-${filter.id}" class="statistic__filters-label">${filter.title}</label>
      `.trim();
    }).join(` `);
  }

  getTemplate() {
    return `
      <section class="statistic">
        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>
         
          ${this._getFiltersTemplate()}
        </form>
  
        <div class="statistic__chart-wrap"></div>
      </section>`.trim();
  }
}

export default Statistics;
