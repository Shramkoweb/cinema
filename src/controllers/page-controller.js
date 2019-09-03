import Films from "../components/films";
import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import Sort from "../components/sort";
import ShowMoreButton from "../components/show-more-button";
import Search from "../components/search";
import Profile from "../components/profile";
import {
  isEscKeyDown,
  Position,
  renderElement,
  sortByComments,
  sortByRating, sortFilms,
  unrenderElement
} from "../util";
import Navigation from "../components/navigation";
import {getFilterCount} from "../filter";
import FilmsEmpty from "../components/films-empty";

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
  }

  // render one exemplar of film
  _renderFilm(film, container) {
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
      renderElement(this._filmsListElement, this._moreButtonComponent.getElement(), Position.BEFOREEND);
    }

    if (evt.target.tagName === `A`) {
      const sortType = evt.target.dataset.sortType;
      this._sortedFilms = sortFilms(this._filmCards, sortType);
      this._filmsContainerElement.innerHTML = ``;
      this._renderFilms(this._sortedFilms.slice(0, MAX_FILMS_TO_RENDER), this._filmsContainerElement);
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

    // 0 films
    if (this._filmCards.length === 0) {
      renderElement(this._container, this._emptyFilmsComponent.getElement(), Position.BEFOREEND);
      return;
    }

    // if films > 5 render moreButton
    if (this._filmCards.length > MAX_FILMS_TO_RENDER) {
      renderElement(this._filmsListElement, this._moreButtonComponent.getElement(), Position.BEFOREEND);

      const onLoadMoreButtonClick = () => {
        this._renderLeftFilms(this._filmCards);
      };

      this._moreButtonComponent.getElement().addEventListener(`click`, onLoadMoreButtonClick);
    }

    renderElement(this._container, this._sortComponent.getElement(), Position.BEFOREEND);
    renderElement(this._container, this._filmsComponent.getElement(), Position.BEFOREEND);
    this._renderFilms(this._filmCards.slice(0, MAX_FILMS_TO_RENDER), this._filmsContainerElement);
    this._renderFilms(this._topRatedFilms, this._topRatedFilmsContainer);
    this._renderFilms(this._mostCommentedFilms, this._mostCommentedFilmsContainer);
    this._sortComponent.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    this.getFilmsAmountStatistics();
  }
}
