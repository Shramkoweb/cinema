const filmsToRating = {
  21: `movie buff`,
  20: `fan`,
  10: `novice`,
  0: ``,
};

export const getUserRating = (movies) => {
  let watchedMovies = 0;
  movies.forEach((movie) => {
    if (movie.isWatched) {
      watchedMovies++;
    }
  });

  const profileRating = Object.keys(filmsToRating).find((count) => count >= watchedMovies);
  return filmsToRating[profileRating];
};

export const getProfile = (movies) => {
  return `   
    <section class="header__profile profile">
      <p class="profile__rating">${getUserRating(movies)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `;
};
