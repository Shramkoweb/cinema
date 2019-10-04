import Sort from "../components/sort";
import {Position} from "../constants";
import {renderElement, sortFilms} from "../utils";

export default class SortController {
  constructor(container, renderFilms) {
    this._container = container;
    this._renderFilms = renderFilms;
    this._sortComponent = new Sort();
  }

  show() {
    this._sortComponent.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._sortComponent.getElement().classList.add(`visually-hidden`);
  }

  assignFilms(films) {
    this._films = films;
    this._sorteredFilms = films.slice();
  }


  init() {
    const onSortLinkClick = (evt) => {
      evt.preventDefault();

      if (evt.target.tagName === `A`) {

        // Убираю активный класс
        this._sortComponent.getElement()
          .querySelector(`.sort__button--active`).classList
          .remove(`sort__button--active`);


        // Активный класс на целевой елемент
        evt.target.classList.add(`sort__button--active`);


        // Тип Сортировки в зависимости от нажатой кнопки
        const sortType = evt.target.dataset.sortType;


        // отрисовка фильмов
        this._sorteredFilms = sortFilms(this._films, sortType);
        this._renderFilms(this._sorteredFilms);
      }
    };

    // Вешаю обработчики клика на кнопки сортировки
    this._sortComponent.getElement().addEventListener(`click`, (evt) => onSortLinkClick(evt));
    renderElement(this._container, this._sortComponent.getElement(), Position.AFTERBEGIN);
  }
}
