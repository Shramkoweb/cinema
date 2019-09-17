import {SearchResult} from "../components/search-result";
import {NoSearchResult} from "../components/no-search-result";
import {hideElement, renderElement, showElement} from "../util";

export default class SearchController {
  constructor(searchPhrase, films) {
    this._films = films;
    this._searchPhrase = searchPhrase;
    this._searchResult = new SearchResult();
    this._emptySearchResult = new NoSearchResult();
    this._filmsContainer = document.querySelector(`.films-list__container`);
    this._filmsTopRatedContainer = document.querySelector(`.films-list__container--rated`);
    this._filmsTopCommentedContainer = document.querySelector(`.films-list__container--commented`);
    this._resultElement = document.querySelector(`.result`);
    this._navigationElement = document.querySelector(`.main-navigation`);
    this._sortElement = document.querySelector(`.sort`);
    this._extraFilmsELements = document.querySelectorAll(`.films-list--extra`);
    this._showMoreButton = document.querySelector(`.films-list__show-more`);
  }

  search() {
    // hide all non-used nodes
    hideElement(this._navigationElement);
    hideElement(this._sortElement);
    this._extraFilmsELements.forEach((element) => hideElement(element));
    hideElement(this._showMoreButton);

    // clear films container
    this._filmsContainer.innerHTML = ``;

    if (this._resultElement) {
      this._searchResult.removeElement();
    }

    renderElement(this._filmsContainer, this._searchResult.getElement());

    const pattern = new RegExp(this._searchPhrase, `i`);

    const filteredMovies = this._films.filter((film) => pattern.exec(film.title) !== null);

    if (filteredMovies.length === 0) {
      renderElement(this._filmsContainer, this._emptySearchResult.getElement());
    }

    // add result amount to .result__count
    const searchResultCountElement = document.querySelector(`.result__count`);
    searchResultCountElement.textContent = filteredMovies.length;

    return filteredMovies;
  }

  cancel() {
    // show back all hidden nodes
    showElement(this._navigationElement);
    showElement(this._sortElement);
    this._extraFilmsELements.forEach((element) => showElement(element));
    showElement(this._showMoreButton);
    this._searchResult.removeElement();

    this._filmsContainer.innerHTML = ``;
    this._filmsTopRatedContainer.innerHTML = ``;
    this._filmsTopCommentedContainer.innerHTML = ``;
  }
}
