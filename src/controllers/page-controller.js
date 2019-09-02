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

const MAX_FILMS_TO_RENDER = 5;
let FILMS_ON_PAGE = 5;

export default class PageController {
  constructor(container, filmCards) {
    this._container = container;
    this._filmCards = filmCards;
    this._sortedFilms = filmCards;
    this._hasFilms = Boolean(filmCards.length);
    this._headerElement = document.querySelector(`header`);
    this._search = new Search();
    this.profile = new Profile(this._filmCards);
    this._sort = new Sort();
    this._films = new Films(this._hasFilms);
    this._moreButton = new ShowMoreButton();
    this._filmsList = this._films.getElement().querySelector(`.films-list`);
    this._topRatedFilms = getLastTwoSortedItemsFrom(this._filmCards, sortByRating);
    this._filmsContainer = this._films.getElement().querySelector(`.films-list__container`);
    this._topRatedFilmsContainer = this._films.getElement().querySelector(`.films-list__container--rated`);
    this._mostCommentedFilmsContainer = this._films.getElement().querySelector(`.films-list__container--commented`);
    this._mostCommentedFilms = getLastTwoSortedItemsFrom(this._filmCards, sortByComments);
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
      .forEach((film) => this._renderFilms(film, this._filmsContainer));

    FILMS_ON_PAGE = FILMS_ON_PAGE + MAX_FILMS_TO_RENDER;
    let leftFilmsRender = this._sortedFilms.length - FILMS_ON_PAGE;

    if (leftFilmsRender <= 0) {
      unrenderElement(this._moreButton.getElement());
    }
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._filmsContainer.innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date`:
        const sortedByDate = this._sortedFilms.sort((a, b) => a.releaseDate - b.releaseDate);
        sortedByDate.slice(0, MAX_FILMS_TO_RENDER).forEach((film) => this._renderFilms(film, this._filmsContainer));
        break;
      case `rating`:
        const sortedByRating = this._sortedFilms.sort((a, b) => b.rating - a.rating);
        sortedByRating.slice(0, MAX_FILMS_TO_RENDER).forEach((film) => this._renderFilms(film, this._filmsContainer));
        break;
      case `default`:
        this._sortedFilms.slice(0, MAX_FILMS_TO_RENDER).forEach((film) => this._renderFilms(film, this._filmsContainer));
        break;
    }
  }

  init() {
    renderElement(this._headerElement, this._search.getElement(), Position.BEFOREEND);
    renderElement(this._headerElement, this.profile.getElement(), Position.BEFOREEND);

    // 0 films
    if (!this._hasFilms) {
      renderElement(this._container, this._films.getElement(), Position.BEFOREEND);
      return;
    }

    // if <= 5 films -> render cards without moreButton
    if (this._filmCards.length <= MAX_FILMS_TO_RENDER) {
      this._filmCards.forEach((film) => this._renderFilms(film, this._filmsContainer));

      // if > 5 -> render moreButton & cards & sort
    } else {
      renderElement(this._filmsList, this._moreButton.getElement(), Position.BEFOREEND);
      this._filmCards.slice(0, MAX_FILMS_TO_RENDER).forEach((film) => this._renderFilms(film, this._filmsContainer));

      const onLoadMoreButtonClick = () => {
        this._renderLeftFilms(this._filmCards);
      };

      this._moreButton.getElement().addEventListener(`click`, onLoadMoreButtonClick);
    }

    renderElement(this._container, this._sort.getElement(), Position.BEFOREEND);
    renderElement(this._container, this._films.getElement(), Position.BEFOREEND);
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    this._topRatedFilms.forEach((film) => this._renderFilms(film, this._topRatedFilmsContainer));
    this._mostCommentedFilms.forEach((film) => this._renderFilms(film, this._mostCommentedFilmsContainer));
    const footerStatisticsElement = document.querySelector(`.footer__statistics p`);
    footerStatisticsElement.textContent = `${this._filmCards.length} movies inside`;
  }
}


