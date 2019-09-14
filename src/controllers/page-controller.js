import Films from "../components/films";
import Sort from "../components/sort";
import ShowMoreButton from "../components/show-more-button";
import Search from "../components/search";
import Profile from "../components/profile";
import {
  renderElement,
  sortByComments,
  sortByRating, sortFilms,
  unrenderElement,
} from "../util";
import Navigation from "../components/navigation";
import {getFilterCount} from "../filter";
import FilmsEmpty from "../components/films-empty";
import FilmController from "./film-controller";

const MAX_FILMS_TO_RENDER = 5;

export default class PageController {
  constructor(container, filmCards) {
    this._container = container;
    this._filmCards = filmCards;
    this._filmsOnPage = MAX_FILMS_TO_RENDER;
    this._sortedFilms = filmCards.slice();
    this._headerElement = document.querySelector(`header`);
    this._searchComponent = new Search();
    this._emptyFilmsComponent = new FilmsEmpty();
    this._menuComponent = new Navigation(getFilterCount(filmCards));
    this._profileComponent = new Profile(filmCards);
    this._sortComponent = new Sort();
    this._filmsComponent = new Films();
    this._moreButtonComponent = new ShowMoreButton();
    this._mostCommentedFilms = sortByComments(filmCards).slice(0, 2);
    this._topRatedFilms = sortByRating(filmCards).slice(0, 2);
    this._topRatedFilmsContainer = this._filmsComponent.getElement().querySelector(`.films-list__container--rated`);
    this._mostCommentedFilmsContainer = this._filmsComponent.getElement().querySelector(`.films-list__container--commented`);
    this._filmsListElement = this._filmsComponent.getElement().querySelector(`.films-list`);
    this._filmsContainerElement = this._filmsComponent.getElement().querySelector(`.films-list__container`);
    this._subscriptions = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }

  _renderUpdatesFilms() {
    this._filmsContainerElement.innerHTML = ``;
    this._mostCommentedFilmsContainer.innerHTML = ``;
    this._topRatedFilmsContainer.innerHTML = ``;

    // if films > 5 render moreButton
    if (this._filmCards.length > MAX_FILMS_TO_RENDER) {
      renderElement(this._filmsListElement, this._moreButtonComponent.getElement());
    }

    this._renderFilms(this._filmCards.slice(0, MAX_FILMS_TO_RENDER), this._filmsContainerElement);
    this._renderFilms(this._topRatedFilms, this._topRatedFilmsContainer);
    this._renderFilms(this._mostCommentedFilms, this._mostCommentedFilmsContainer);
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _onDataChange(newData, oldData) {
    const index = this._filmCards.findIndex((film) => film.id === oldData.id);

    this._filmCards[index] = newData;


    this._mostCommentedFilms = sortByComments(this._filmCards).slice(0, 2);
    this._topRatedFilms = sortByRating(this._filmCards).slice(0, 2);

    this._renderUpdatesFilms();
  }

  // render one exemplar of film
  _renderFilm(film, container) {
    const filmController = new FilmController(container, film, this._onDataChange, this._onChangeView);
    this._subscriptions.push(filmController.setDefaultView.bind(filmController));
  }

  // render films in container
  _renderFilms(films, container) {
    films.forEach((film) => this._renderFilm(film, container));
  }

  _renderLeftFilms() {
    this._sortedFilms
      .slice(this._filmsOnPage, (this._filmsOnPage + MAX_FILMS_TO_RENDER))
      .forEach((film) => this._renderFilm(film, this._filmsContainerElement));

    this._filmsOnPage = this._filmsOnPage + MAX_FILMS_TO_RENDER;
    let leftFilmsRender = this._sortedFilms.length - this._filmsOnPage;

    if (leftFilmsRender <= 0) {
      unrenderElement(this._moreButtonComponent.getElement());
    }
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    this._filmsOnPage = MAX_FILMS_TO_RENDER;

    if (this._filmCards.length > 5) {
      renderElement(this._filmsListElement, this._moreButtonComponent.getElement());
    }

    if (evt.target.tagName === `A`) {
      const sortType = evt.target.dataset.sortType;
      this._sortedFilms = sortFilms(this._filmCards, sortType);
      this._filmsContainerElement.innerHTML = ``;
      this._renderFilms(this._sortedFilms.slice(0, MAX_FILMS_TO_RENDER), this._filmsContainerElement);
    }
  }

  _getFilmsAmountStatistics() {
    const footerStatisticsElement = document.querySelector(`.footer__statistics p`);
    footerStatisticsElement.textContent = `${this._filmCards.length} movies inside`;
  }

  init() {
    renderElement(this._headerElement, this._searchComponent.getElement());
    renderElement(this._headerElement, this._profileComponent.getElement());
    renderElement(this._container, this._menuComponent.getElement());

    // 0 films
    if (this._filmCards.length === 0) {
      renderElement(this._container, this._emptyFilmsComponent.getElement());
      return;
    }

    // if films > 5 render moreButton
    if (this._filmCards.length > MAX_FILMS_TO_RENDER) {
      renderElement(this._filmsListElement, this._moreButtonComponent.getElement());

      const onLoadMoreButtonClick = () => {
        this._renderLeftFilms(this._filmCards);
      };

      this._moreButtonComponent.getElement().addEventListener(`click`, onLoadMoreButtonClick);
    }

    renderElement(this._container, this._sortComponent.getElement());
    renderElement(this._container, this._filmsComponent.getElement());
    this._renderFilms(this._filmCards.slice(0, MAX_FILMS_TO_RENDER), this._filmsContainerElement);
    this._renderFilms(this._topRatedFilms, this._topRatedFilmsContainer);
    this._renderFilms(this._mostCommentedFilms, this._mostCommentedFilmsContainer);
    this._sortComponent.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    this._getFilmsAmountStatistics();
  }

  hide() {
    this._sortComponent.getElement().classList.add(`visually-hidden`);
    this._filmsComponent.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this._sortComponent.getElement().classList.remove(`visually-hidden`);
    this._filmsComponent.getElement().classList.remove(`visually-hidden`);
  }
}
