import Films from "../components/films";
import {isEscKeyDown, Position, renderElement, unrenderElement} from "../util";
import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import Sort from "../components/sort";
import ShowMoreButton from "../components/show-more-button";

const MAX_FILMS_TO_RENDER = 5;
let FILMS_ON_PAGE = 5;

export default class PageController {
  constructor(container, filmCards) {
    this._container = container;
    this._hasFilms = Boolean(filmCards.length);
    this._sort = new Sort();
    this._films = new Films(this._hasFilms);
    this._moreButton = new ShowMoreButton();
    this._filmCards = filmCards;
    this._filmsList = this._films.getElement().querySelector(`.films-list`);
  }

  _renderFilms(film) {
    const filmInstance = new FilmCard(film);
    const filmDetailsInstance = new FilmDetails(film);
    const filmsContainer = this._films.getElement().querySelector(`.films-list__container`);
    const onMoviePopUpEscPress = (evt) => isEscKeyDown(evt, closeMoviePopUp);

    const closeMoviePopUp = () => {
      filmsContainer.removeChild(filmDetailsInstance.getElement());
      document.removeEventListener(`keydown`, onMoviePopUpEscPress);
    };

    const openMoviePopup = () => {
      filmsContainer.appendChild(filmDetailsInstance.getElement());
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

    renderElement(filmsContainer, filmInstance.getElement(), Position.BEFOREEND);
  }

  _renderLeftFilms(films) {
    films
      .slice(FILMS_ON_PAGE, (FILMS_ON_PAGE + MAX_FILMS_TO_RENDER))
      .forEach((film) => this._renderFilms(film));

    FILMS_ON_PAGE = FILMS_ON_PAGE + MAX_FILMS_TO_RENDER;
    let leftMoviesToRender = films.length - FILMS_ON_PAGE;

    if (leftMoviesToRender <= 0) {
      unrenderElement(this._moreButton.getElement());
    }
  }

  init() {
    // 0 films
    if (!this._hasFilms) {
      renderElement(this._container, this._films.getElement(), Position.BEFOREEND);

      // if <= 5 films -> render cards without moreButton & sort
    } else if (this._filmCards.length <= MAX_FILMS_TO_RENDER) {
      renderElement(this._container, this._sort.getElement(), Position.BEFOREEND);
      renderElement(this._container, this._films.getElement(), Position.BEFOREEND);
      this._filmCards.forEach((film) => this._renderFilms(film));

      // if > 5 -> render moreButton & cards & sort
    } else {
      renderElement(this._container, this._sort.getElement(), Position.BEFOREEND);
      renderElement(this._container, this._films.getElement(), Position.BEFOREEND);
      renderElement(this._filmsList, this._moreButton.getElement(), Position.BEFOREEND);
      this._filmCards.slice(0, MAX_FILMS_TO_RENDER).forEach((film) => this._renderFilms(film));

      const onLoadMoreButtonClick = () => {
        this._renderLeftFilms(this._filmCards);
      };

      this._moreButton.getElement().addEventListener(`click`, onLoadMoreButtonClick);
    }
  }
}


