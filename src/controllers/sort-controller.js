import Sort from "../components/sort";
import {renderElement, sortFilms} from "../utils";
import {Position} from "../constants";

class SortController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new Sort();
  }

  init() {
    const onSortLinkClick = (evt) => {
      evt.preventDefault();

      // Убираю активный класс
      this._sortComponent.getElement()
        .querySelector(`.sort__button--active`).classList
        .remove(`sort__button--active`);

      // Активный класс на целевой елемент
      evt.target.classList.add(`sort__button--active`);

      const sortType = evt.target.dataset.sortType;

      this._films = sortFilms(this._films, sortType);
      console.log(this._films);
    };

    // Вешаю обработчики клика на кнопки сортировки
    this._sortComponent.getElement().querySelectorAll(`.sort__button`).forEach((elemBtnSort) => {
      elemBtnSort.addEventListener(`click`, onSortLinkClick);
    });

    renderElement(this._container, this._sortComponent.getElement(), Position.AFTERBEGIN);
  }

  assignFilms(films) {
    this._films = films;
    this._sorteredFilms = films.slice();
  }

  show() {
    this._sortComponent.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._sortComponent.getElement().classList.add(`visually-hidden`);
  }
}

export default SortController;
