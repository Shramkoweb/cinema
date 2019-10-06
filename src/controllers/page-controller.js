import FilmsContainer from "../components/films-container";
import FilmsController from "./films-controller";
import FilmsDatabase from "../components/films-database";
import FilmsList from "../components/films-list";
import FilmsListCommented from "../components/films-list-commented";
import FilmsListRated from "../components/films-list-rated";
import FilmsNoMovies from "../components/films-no-movies";
import ShowMoreButton from "../components/show-more-button";
import SortController from "./sort-controller";
import {MAX_FILMS_TO_RENDER, RenderPosition} from "../constants";
import {renderElement, unrenderElement} from "../utils";

export default class PageController {
  constructor(container, onDataChange) {
    this._container = container;
    this._emptyData = null;
    this._emptyResult = null;
    this._filmsContainer = new FilmsContainer();
    this._filmsList = new FilmsList();
    this._filmsListCommented = new FilmsListCommented();
    this._filmsListRated = new FilmsListRated();
    this._isFilter = false;
    this._isSearch = false;
    this._onDataChange = onDataChange;
    this._showMoreButton = new ShowMoreButton();
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._showedFilms = MAX_FILMS_TO_RENDER;
    this._sortController = new SortController(this._container, this._initialRender.bind(this));
    this._filmsControllerMain = new FilmsController(this._filmsContainer, this._filmsList, this._onDataChange);
    this._filmsControllerRated = new FilmsController(this._filmsContainer, this._filmsListRated, this._onDataChange, RenderPosition.RATED);
    this._filmsControllerCommented = new FilmsController(this._filmsContainer, this._filmsListCommented, this._onDataChange, RenderPosition.COMMENTED);

    this._init();
  }

  hide() {
    this._sortController.hide();
    this._filmsContainer.getElement().classList.add(`visually-hidden`);
  }

  setSearch(state) {
    this._isSearch = state;
  }

  _renderShowButton() {
    this._showMoreButton.getElement().addEventListener(`click`, this._onShowMoreButtonClick);
    renderElement(this._filmsList.getElement(), this._showMoreButton.getElement());
  }

  _init() {
    renderElement(this._container, this._filmsContainer.getElement());
    this._sortController.init();
    this._sortController.hide();
    renderElement(this._filmsContainer.getElement(), this._filmsList.getElement());
  }

  show(films, isFilter = false) {
    this._isFilter = isFilter;

    if (!this._isSearch) {
      if (films !== this._films) {
        this._setFilms(films);
      }

      this._sortController.assignFilms(films);
      this._filmsContainer.getElement().classList.remove(`visually-hidden`);
    }
  }

  _setFilms(films) {
    this._films = films.slice();
    this._initialRender(this._films);
  }

  _unrednerMainContainer() {
    unrenderElement(this._filmsList.getElement());
    unrenderElement(this._filmsListRated.getElement());
    unrenderElement(this._filmsListCommented.getElement());
    unrenderElement(this._showMoreButton.getElement());

    this._filmsList.removeElement();
    this._filmsListRated.removeElement();
    this._filmsListCommented.removeElement();
    this._showMoreButton.removeElement();
  }

  _initialRender(films) {
    if (this._emptyResult !== null) {
      unrenderElement(this._emptyResult.getElement());
      this._emptyResult.removeElement();
    }
    if (this._emptyData !== null) {
      unrenderElement(this._emptyData.getElement());
      this._emptyData.removeElement();
    }
    if (this._isFilter && films.length === 0) {
      this._sortController.hide();
      this._renderNoMoviesElement();
    }
    if (!this._isFilter && films.length === 0) {
      this._sortController.hide();
      this._renderEmptyDatabaseElement();
    }
    this._unrednerMainContainer();

    renderElement(this._filmsContainer.getElement(), this._filmsList.getElement());

    if (this._showedFilms < films.length) {
      this._renderShowButton();
    }

    this._sortController.show();
    this._filmsControllerMain.init(films.slice(0, this._showedFilms));
    this._filmsControllerRated.init(films.slice());
    this._filmsControllerCommented.init(films.slice());
  }

  _onShowMoreButtonClick(evt) {
    evt.preventDefault();
    this._filmsControllerMain.renderMoreFilms(this._films.slice(this._showedFilms, this._showedFilms + MAX_FILMS_TO_RENDER));
    this._showedFilms += MAX_FILMS_TO_RENDER;

    if (this._showedFilms >= this._films.length) {
      unrenderElement(this._showMoreButton.getElement());
      this._showMoreButton.removeElement();
    }
  }


  _renderNoMoviesElement() {
    this._emptyResult = new FilmsNoMovies();
    this._unrednerMainContainer();
    renderElement(this._filmsContainer.getElement(), this._emptyResult.getElement());
  }

  _renderEmptyDatabaseElement() {
    this._emptyData = new FilmsDatabase();
    this._unrednerMainContainer();
    renderElement(this._filmsContainer.getElement(), this._emptyData.getElement());
  }
}
