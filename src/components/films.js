import {getShowMoreButton} from "./show-more-button";
import {getMovieTemplate} from "./film-card";

const MAX_FILMS_COUNT = 5;

const getFilmsTemplate = (movies) => {
  return movies.map((movie) => getMovieTemplate(movie)).join(``);
};

export const generateMoviesBoard = (movies) => {
  return `
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    
        <div class="films-list__container">
          ${getFilmsTemplate(movies)}               
        </div>
         
         ${getShowMoreButton(movies.slice(0, MAX_FILMS_COUNT))}
      </section>
    
      <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
    
        <div class="films-list__container">
        </div>
      </section>
    
      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
    
        <div class="films-list__container">
        </div>
      </section>
    </section>
  `;
};
