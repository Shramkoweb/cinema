import FilmsController from "./films-controller";
import FilmsContainer from "../components/films-container";
import FilmsDatabase from "../components/films-database";
import FilmsList from "../components/films-list";
import Result from "../components/result";
import {MIN_SEARCH_PHRASE, Position} from "../constants";
import {renderElement, unrenderElement} from "../utils";

export default class SearchController {
  constructor(container, searchComponent, onDataChange, onSearchReset) {
    this._container = container;
    this._dataBaseComponent = null;
    this._filmsList = new FilmsList();
    this._filmsContainer = new FilmsContainer();
    this._isSearch = false;
    this._onDataChange = onDataChange;
    this._onSearchReset = onSearchReset;
    this._searchComponent = searchComponent;
    this._resultElement = new Result();
    this._filmsController = new FilmsController(this._filmsContainer, this._filmsList, this._onDataChange);

    this._init();
    this.hide();
  }

  hide() {
    this._unrenderResult();
  }

  show(films) {
    if (this._isSearch) {
      this._films = films.slice();
      const value = this._searchComponent.getElement().querySelector(`.search__field`).value;
      this._renderSearchResultContainer();
      const filteredFilms = this._films.filter((film) => {
        return film.title.toLowerCase().includes(value.toLowerCase());
      });
      this._renderResult(filteredFilms);
    }
  }

  setState(state) {
    this._isSearch = state;
  }

  _renderSearchResultContainer() {
    renderElement(this._container, this._filmsContainer.getElement());
    renderElement(this._filmsContainer.getElement(), this._filmsList.getElement());
  }

  _init() {
    renderElement(this._container, this._resultElement.getElement());
    this._renderSearchResultContainer();

    const onSearchButtonClick = () => {
      this._searchComponent.getElement().querySelector(`.search__field`).value = ``;
      this._onSearchReset();
    };

    const onSearchChange = (evt) => {
      const {value} = evt.target;

      if (value.length >= MIN_SEARCH_PHRASE) {
        const films = this._films.filter((film) => {
          return film.title.includes(value);
        });
        this._renderResult(films);
      }
    };

    this._searchComponent.getElement().querySelector(`.search__reset`)
      .addEventListener(`click`, onSearchButtonClick);

    this._searchComponent.getElement().querySelector(`.search__field`)
      .addEventListener(`keyup`, onSearchChange);
  }

  _renderResult(films) {
    if (this._resultElement) {
      unrenderElement(this._resultElement.getElement());
      this._resultElement.removeElement();
    }

    this._resultElement = new Result(films.length);
    renderElement(this._container, this._resultElement.getElement(), Position.AFTERBEGIN);

    if (this._dataBaseComponent !== null) {
      unrenderElement(this._dataBaseComponent.getElement());
      this._dataBaseComponent.removeElement();
    }

    if (films.length === 0) {
      return this._renderEmptyDatabase();
    }

    this._unrenderResult();
    renderElement(this._container, this._resultElement.getElement());
    this._renderSearchResultContainer();
    return this._filmsController.init(films);
  }

  _unrenderResult() {
    unrenderElement(this._filmsList.getElement());
    unrenderElement(this._filmsContainer.getElement());
    unrenderElement(this._resultElement.getElement());

    this._resultElement.removeElement();
    this._filmsList.removeElement();
    this._filmsContainer.removeElement();
  }

  _renderEmptyDatabase() {
    this._dataBaseComponent = new FilmsDatabase();
    this._unrenderResult();
    this._renderSearchResultContainer();
    renderElement(this._filmsList.getElement(), this._dataBaseComponent.getElement());
  }
}
