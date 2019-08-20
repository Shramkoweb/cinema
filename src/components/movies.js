import {getShowMoreButton} from "./show-more-button";
import {getMovieTemplate} from "./movie";

const MAX_FILMS_COUNT = 5;

export const getMoviesTamplate = (movies) => {
  return movies.map((movie) => getMovieTemplate(movie)).join(``);
};

const getMostRatedMovies = (movies, count = 2) => {
  const moviesCopy = [...movies];
  moviesCopy.sort((a, b) => a.rating - b.rating);

  return moviesCopy.slice(-count);
};


export const getMostCommentedMovies = (movies, count = 2) => {
  const moviesCopy = [...movies];
  moviesCopy.sort((a, b) => a.comments - b.comments);

  return moviesCopy.slice(-count);
};

export const getBoardTemplate = (movies) => {
  return `
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    
        <div class="films-list__container">
          ${getMoviesTamplate(movies)}               
        </div>
         
         ${getShowMoreButton()}
      </section>
    
      <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
    
        <div class="films-list__container">
          ${getMoviesTamplate(getMostRatedMovies(movies, 2))}
        </div>
      </section>
    
      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
    
        <div class="films-list__container">
          ${getMoviesTamplate(getMostCommentedMovies(movies, 2))}
        </div>
      </section>
    </section>
  `.trim();
};
