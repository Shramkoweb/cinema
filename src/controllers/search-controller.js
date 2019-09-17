import {SearchResult} from "../components/search-result";
import {NoSearchResult} from "../components/no-search-result";
import {renderElement} from "../util";

export default class SearchController {
  constructor(searchPhrase, films) {
    this._films = films;
    this._searchPhrase = searchPhrase;
    this._searchResult = new SearchResult();
    this._emptySearchResult = new NoSearchResult();
    this._filmsContainer = document.querySelector(`.films-list__container`);
    this._resultElement = document.querySelector(`.result`);
  }

  search() {
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
    const searchResultCountElement = document.querySelector(`.result__count`);
    searchResultCountElement.textContent = filteredMovies.length;

    return filteredMovies;
  }

  cancel() {
    this._searchResult.removeElement();
    this._filmsContainer.innerHTML = ``;
  }
}
