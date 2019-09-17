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
import SearchController from "./search-controller";

const MAX_FILMS_TO_RENDER = 5;
const MIN_PHRASE_LENGTH = 3;

export default class PageController {
  constructor(container, filmCards) {
    this._container = container;
    this._filmCards = filmCards;
    this._filmsOnPage = MAX_FILMS_TO_RENDER;
    this._headerElement = document.querySelector(`header`);
    this._searchComponent = new Search();
    this._filmsCopy = filmCards.slice();
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
    this._isSearchActive = false;
    this._subscriptions = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }

  _renderUpdatesFilms() {
    this._filmsContainerElement.innerHTML = ``;
    this._mostCommentedFilmsContainer.innerHTML = ``;
    this._topRatedFilmsContainer.innerHTML = ``;

    // if films > 5 render moreButton
    if (this._filmCards.length > this._filmsOnPage) {
      renderElement(this._filmsListElement, this._moreButtonComponent.getElement());
    }

    this._renderFilms(this._filmsCopy.slice(0, this._filmsOnPage), this._filmsContainerElement);
    this._renderFilms(this._topRatedFilms, this._topRatedFilmsContainer);
    this._renderFilms(this._mostCommentedFilms, this._mostCommentedFilmsContainer);
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _onDataChange(newData, oldData) {
    const index = this._filmCards.findIndex((film) => film.id === oldData.id);
    const copyIndex = this._filmsCopy.findIndex((film) => film.id === oldData.id);

    this._filmCards[index] = newData;
    this._filmsCopy[copyIndex] = newData;

    this._mostCommentedFilms = sortByComments(this._filmCards).slice(0, 2);
    this._topRatedFilms = sortByRating(this._filmCards).slice(0, 2);

    if (this._isSearchActive) {
      const searchController = new SearchController(this._phrase, this._filmCards);

      const sortedFilms = searchController.search();
      this._renderFilms(sortedFilms, this._filmsContainerElement);
    } else {
      this._renderUpdatesFilms();
    }
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
    this._filmsCopy.slice(this._filmsOnPage, (this._filmsOnPage + MAX_FILMS_TO_RENDER))
      .forEach((film) => this._renderFilm(film, this._filmsContainerElement));

    this._filmsOnPage = this._filmsOnPage + MAX_FILMS_TO_RENDER;
    let leftFilmsRender = this._filmsCopy.length - this._filmsOnPage;

    if (leftFilmsRender <= 0) {
      unrenderElement(this._moreButtonComponent.getElement());
    }
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();
    this._sortComponent.getElement()
      .querySelector(`.sort__button--active`).classList
      .remove(`sort__button--active`);

    if (evt.target.tagName === `A`) {
      evt.target.classList.add(`sort__button--active`);
      const sortType = evt.target.dataset.sortType;
      this._filmsCopy = sortFilms(this._filmCards, sortType);

      this._filmsContainerElement.innerHTML = ``;
      this._renderFilms(this._filmsCopy.slice(0, this._filmsOnPage), this._filmsContainerElement);
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

    const searchInput = this._headerElement.querySelector(`.search__field`);
    const searchResetButton = this._headerElement.querySelector(`.search__reset`);

    searchResetButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      searchInput.value = ``;
      const searchController = new SearchController();
      searchController.cancel();
      this._isSearchActive = false;
      this._renderFilms(this._filmsCopy.slice(0, this._filmsOnPage), this._filmsContainerElement);
      this._renderFilms(this._topRatedFilms, this._topRatedFilmsContainer);
      this._renderFilms(this._mostCommentedFilms, this._mostCommentedFilmsContainer);
    });

    searchInput.addEventListener(`input`, () => {
      this._phrase = searchInput.value;
      const searchController = new SearchController(this._phrase, this._filmCards);

      if (this._phrase.length >= MIN_PHRASE_LENGTH) {
        const sortedFilms = searchController.search();
        this._renderFilms(sortedFilms, this._filmsContainerElement);
        this._isSearchActive = true;
      } else if (this._phrase.length === 0) {
        searchController.cancel();
        this._isSearchActive = false;
        this._renderFilms(this._filmsCopy.slice(0, this._filmsOnPage), this._filmsContainerElement);
        this._renderFilms(this._topRatedFilms, this._topRatedFilmsContainer);
        this._renderFilms(this._mostCommentedFilms, this._mostCommentedFilmsContainer);
      }
    });
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
