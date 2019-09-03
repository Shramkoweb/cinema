import Films from "../components/films";
import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import Sort from "../components/sort";
import ShowMoreButton from "../components/show-more-button";
import Search from "../components/search";
import Profile from "../components/profile";
import {
  getLastTwoSortedItemsFrom,
  isEscKeyDown,
  Position,
  renderElement,
  sortByComments,
  sortByRating,
  unrenderElement
} from "../util";
import Navigation from "../components/navigation";
import {getFilterCount} from "../filter";
import FilmsEmpty from "../components/films-empty";

const MAX_FILMS_TO_RENDER = 5;
let FILMS_ON_PAGE = 5;

export default class PageController {
  constructor(container, filmCards) {
    this._container = container;
    this._filmCards = filmCards;
    this._sortedFilms = filmCards.slice();
    this._headerElement = document.querySelector(`header`);
    this._searchComponent = new Search();
    this._emptyFilmsComponent = new FilmsEmpty();
    this._menuComponent = new Navigation(getFilterCount(filmCards));
    this._profileComponent = new Profile(filmCards);
    this._sortComponent = new Sort();
    this._filmsComponent = new Films();
    this._moreButtonComponent = new ShowMoreButton();
    this._mostCommentedFilms = getLastTwoSortedItemsFrom(filmCards, sortByComments);
    this._topRatedFilms = getLastTwoSortedItemsFrom(filmCards, sortByRating);
    this._topRatedFilmsContainer = this._filmsComponent.getElement().querySelector(`.films-list__container--rated`);
    this._mostCommentedFilmsContainer = this._filmsComponent.getElement().querySelector(`.films-list__container--commented`);
    this._filmsListElement = this._filmsComponent.getElement().querySelector(`.films-list`);
    this._filmsContainerElement = this._filmsComponent.getElement().querySelector(`.films-list__container`);
  }

  _renderFilms(film, container) {
    const filmInstance = new FilmCard(film);
    const filmDetailsInstance = new FilmDetails(film);
    const onMoviePopUpEscPress = (evt) => isEscKeyDown(evt, closeMoviePopUp);

    const closeMoviePopUp = () => {
      this._container.removeChild(filmDetailsInstance.getElement());
      document.removeEventListener(`keydown`, onMoviePopUpEscPress);
    };

    const openMoviePopup = () => {
      this._container.appendChild(filmDetailsInstance.getElement());
      document.addEventListener(`keydown`, onMoviePopUpEscPress);
    };

    filmInstance.getElement()
      .addEventListener(`click`, openMoviePopup);

    filmDetailsInstance.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, closeMoviePopUp);

    filmDetailsInstance.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onMoviePopUpEscPress);
      });

    filmDetailsInstance.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onMoviePopUpEscPress);
      });

    renderElement(container, filmInstance.getElement(), Position.BEFOREEND);
  }

  _renderLeftFilms() {
    this._sortedFilms
      .slice(FILMS_ON_PAGE, (FILMS_ON_PAGE + MAX_FILMS_TO_RENDER))
      .forEach((film) => this._renderFilms(film, this._filmsContainerElement));

    FILMS_ON_PAGE = FILMS_ON_PAGE + MAX_FILMS_TO_RENDER;
    let leftFilmsRender = this._sortedFilms.length - FILMS_ON_PAGE;

    if (leftFilmsRender <= 0) {
      unrenderElement(this._moreButtonComponent.getElement());
    }
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._filmsContainerElement.innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date`:
        const sortedByDate = this._sortedFilms.sort((a, b) => a.releaseDate - b.releaseDate);
        sortedByDate.slice(0, MAX_FILMS_TO_RENDER).forEach((film) => this._renderFilms(film, this._filmsContainerElement));
        break;
      case `rating`:
        const sortedByRating = this._sortedFilms.sort((a, b) => b.rating - a.rating);
        sortedByRating.slice(0, MAX_FILMS_TO_RENDER).forEach((film) => this._renderFilms(film, this._filmsContainerElement));
        break;
      case `default`:
        this._filmCards.slice(0, MAX_FILMS_TO_RENDER).forEach((film) => this._renderFilms(film, this._filmsContainerElement));
        break;
    }
  }

  getFilmsAmountStatistics() {
    const footerStatisticsElement = document.querySelector(`.footer__statistics p`);
    footerStatisticsElement.textContent = `${this._filmCards.length} movies inside`;
  }

  init() {
    renderElement(this._headerElement, this._searchComponent.getElement(), Position.BEFOREEND);
    renderElement(this._headerElement, this._profileComponent.getElement(), Position.BEFOREEND);
    renderElement(this._container, this._menuComponent.getElement(), Position.BEFOREEND);
    this.getFilmsAmountStatistics();

    // 0 films
    if (this._filmCards.length === 0) {
      renderElement(this._container, this._emptyFilmsComponent.getElement(), Position.BEFOREEND);
      return;
    }

    // if <= 5 films -> render cards without moreButton
    if (this._filmCards.length <= MAX_FILMS_TO_RENDER) {
      this._filmCards.forEach((film) => this._renderFilms(film, this._filmsContainerElement));

      // if > 5 -> render moreButton & cards & sort
    } else {
      renderElement(this._filmsListElement, this._moreButtonComponent.getElement(), Position.BEFOREEND);
      this._filmCards.slice(0, MAX_FILMS_TO_RENDER).forEach((film) => this._renderFilms(film, this._filmsContainerElement));

      const onLoadMoreButtonClick = () => {
        this._renderLeftFilms(this._filmCards);
      };

      this._moreButtonComponent.getElement().addEventListener(`click`, onLoadMoreButtonClick);
    }

    renderElement(this._container, this._sortComponent.getElement(), Position.BEFOREEND);
    renderElement(this._container, this._filmsComponent.getElement(), Position.BEFOREEND);
    this._sortComponent.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    this._topRatedFilms.forEach((film) => this._renderFilms(film, this._topRatedFilmsContainer));
    this._mostCommentedFilms.forEach((film) => this._renderFilms(film, this._mostCommentedFilmsContainer));
  }
}
