import Sort from "../components/sort";
import {renderElement, sortFilms} from "../utils";
import {Position} from "../constants";

class SortController {
  constructor(container, renderFilmsList) {
    this._container = container;
    this._renderFilmsList = renderFilmsList;
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

      // Убираю активный класс
      this._sortComponent.getElement()
        .querySelector(`.sort__button--active`).classList
        .remove(`sort__button--active`);

      evt.target.classList.add(`sort__button--active`);

      if (evt.target.tagName === `A`) {
        // Активный класс на целевой елемент
        evt.target.classList.add(`sort__button--active`);


        // Тип Сортировки в зависимости от нажатой кнопки
        const sortType = evt.target.dataset.sortType;


        // отрисовка фильмов
        this._sorteredFilms = sortFilms(this._films, sortType);
        this._renderFilmsList(this._sorteredFilms);
      }
    };

    // Вешаю обработчики клика на кнопки сортировки
    this._sortComponent.getElement().addEventListener(`click`, (evt) => onSortLinkClick(evt));

    renderElement(this._container, this._sortComponent.getElement(), Position.AFTERBEGIN);
  }
}

export default SortController;
