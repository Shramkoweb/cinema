import {getFilmCards} from "./film-card";
import {getShowMoreButton} from "./show-more-button";

export const getFilms = (filmCount, ratedFilms = 2, mostCommentedFilms = 2) => {
  return `
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    
        <div class="films-list__container">
          ${getFilmCards(filmCount)}               
        </div>
         
         ${getShowMoreButton()}
      </section>
    
      <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
    
        <div class="films-list__container">
          ${getFilmCards(ratedFilms)}
        </div>
      </section>
    
      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
    
        <div class="films-list__container">
          ${getFilmCards(mostCommentedFilms)}
        </div>
      </section>
    </section>
  `;
};
