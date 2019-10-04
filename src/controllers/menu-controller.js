import Menu from '../components/menu';
import {Position, PageFilterTitle, MenuFilter} from '../constants';
import {renderElement, unrenderElement, getFiltersAmount} from '../utils';

class MenuController {
  constructor(container, pageController, searchController, chartController) {
    this._chartController = chartController;
    this._container = container;
    this._films = [];
    this._filterAmount = {};
    this._isSearch = false;
    this._menu = null;
    this._pageController = pageController;
    this._searchController = searchController;
  }

  show(films) {
    if ((!this._isSearch) && (films !== this._films)) {
      this._setFilms(films);
    }
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

  _getFilteredFilms(filterType) {
    const filteredFilmCards = this._films.slice().filter((elem) => elem[filterType]);
    this._pageController.show(filteredFilmCards);
  }

  setSearch(isSearch) {
    this._isSearch = isSearch;
  }

  _init() {
    const onMenuElementClick = (evt) => {
      evt.preventDefault();

      if (evt.target.tagName === `A`) {
        this._menu.getElement()
          .querySelector(`.main-navigation__item--active`).classList
          .remove(`main-navigation__item--active`);

        // Активный класс на целевой елемент
        evt.target.classList.add(`main-navigation__item--active`);

        switch (evt.target.hash.slice(1)) {
          case PageFilterTitle.ALL:
            this._pageController.show(this._films);
            break;
          case PageFilterTitle.WATCHLIST:
            this._getFilteredFilms(MenuFilter.Watchlist);
            break;
          case PageFilterTitle.HISTORY:
            this._getFilteredFilms(MenuFilter.History);
            break;
          case PageFilterTitle.FAVORITES:
            this._getFilteredFilms(MenuFilter.Favorites);
            break;
          case PageFilterTitle.STATS:
            this._pageController.hide();
            this._searchController.hide();
            this._chartController.show(this._films);
            break;
          default:
            break;
        }
      }
    };
    this._menu.getElement().addEventListener(`click`, onMenuElementClick);
    renderElement(this._container, this._menu.getElement(), Position.AFTERBEGIN);
  }
}

export default MenuController;
