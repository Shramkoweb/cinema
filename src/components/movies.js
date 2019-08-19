import {getShowMoreButton} from "./show-more-button";
import {getMovieTemplate} from "./movie";

const MAX_FILMS_COUNT = 5;

const getMoviesTamplate = (movies) => {
  return movies.map((movie) => getMovieTemplate(movie)).join(``);
};

export const getBoardTemplate = (movies) => {
  return `
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    
        <div class="films-list__container">
          ${getMoviesTamplate(movies.slice(0, MAX_FILMS_COUNT))}               
        </div>
         
         ${getShowMoreButton()}
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
