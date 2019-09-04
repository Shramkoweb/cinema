import AbstractComponent from "./absctract-component";

export default class Profile extends AbstractComponent {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  // getting user rating from watched movies
  getUserRating(movies) {
    let watchedMovies = 0;
    movies.forEach((movie) => {
      if (movie.isWatched) {
        watchedMovies++;
      }
    });

    const getUserTitle = (moviesWatched) => {
      let userTitle = ``;
      if (moviesWatched >= 21) {
        userTitle = `Movie Buff`;
      } else if (moviesWatched >= 11) {
        userTitle = `fan`;
      } else if (moviesWatched > 0) {
        userTitle = `novice`;
      }
      return userTitle;
    };

    return getUserTitle(watchedMovies);
  }

  getTemplate() {
    return `
      <section class="header__profile profile">
        <p class="profile__rating">${this.getUserRating(this._movies)}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>
    `.trim();
  }
}
