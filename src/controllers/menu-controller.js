import Menu from '../components/menu';
import {Position, PageFilterTitle} from '../constants';
import {renderElement, unrenderElement, getFiltersAmount} from '../utils';

class MenuController {
  constructor(container, pageController) {
    this._container = container;
    this._pageController = pageController;

    this._isSearch = false;
    this._menu = null;
    this._filterAmount = {};
    this._films = [];
  }

  show(films) {
    if ((!this._isSearch) && (films !== this._films)) {
      this._setFilms(films);
    }
  }

  setSearch(isSearch) {
    this._isSearch = isSearch;
  }

  hide() {
    unrenderElement(this._menu.getElement());
    this._menu.removeElement();
  }

  _setFilms(films) {
    this._films = films.slice();

    this._renderMenu(this._films);
  }

  _renderMenu(films) {
    this._filterAmount = getFiltersAmount(films);

    if (this._menu !== null) {
      this.hide();
    }

    this._menu = new Menu(this._filterAmount);

    this._init();
  }

  _init() {
    const onMenuElemClick = (evt) => {
      evt.preventDefault();
      if (!evt.target.classList.contains(`main-navigation__item`)) {
        return;
      }
      this._menu.getElement()
        .querySelector(`.main-navigation__item--active`).classList
        .remove(`main-navigation__item--active`);

      // Активный класс на целевой елемент
      evt.target.classList.add(`main-navigation__item--active`);


      switch (evt.target.hash.slice(1)) {
        case PageFilterTitle.ALL:
          this._pageController.renderFilmList(this._films);
          break;
        case PageFilterTitle.WATCHLIST:
          this._pageController.setFilterState(PageFilterTitle.WATCHLIST);
          break;
        case PageFilterTitle.HISTORY:
          this._pageController.setFilterState(PageFilterTitle.HISTORY);
          break;
        case PageFilterTitle.FAVORITES:
          this._pageController.setFilterState(PageFilterTitle.FAVORITES);
          break;
        case PageFilterTitle.STATS:
          console.log('STATS');
          break;
        default:
          break;
      }
    };

    this._menu.getElement().addEventListener(`click`, onMenuElemClick);

    renderElement(this._container, this._menu.getElement(), Position.AFTERBEGIN);
  }
}

export default MenuController;
