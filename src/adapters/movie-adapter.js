import moment from "moment";

class MovieAdapter {
  constructor(film) {
    this.id = film[`id`];
    this.image = film[`film_info`][`poster`];
    this.title = film[`film_info`][`title`];
    this.originalTitle = film[`film_info`][`alternative_title`] || ``;
    this.rating = film[`film_info`][`total_rating`];
    this.director = film[`film_info`][`director`];
    this.writers = film[`film_info`][`writers`];
    this.actors = film[`film_info`][`actors`];
    this.releaseDate = Number(moment(film[`film_info`][`release`][`date`]).format(`x`));
    this.runtime = film[`film_info`][`runtime`];
    this.country = film[`film_info`][`release`][`release_country`];
    this.genres = new Set(film[`film_info`][`genre`]);
    this.description = film[`film_info`][`description`];
    this.age = film[`film_info`][`age_rating`];
    this.personalRating = film[`user_details`][`personal_rating`] || null;
    this.isFavorite = Boolean(film[`user_details`][`favorite`]);
    this.isInWatchlist = Boolean(film[`user_details`][`watchlist`]);
    this.isWatched = Boolean(film[`user_details`][`already_watched`]);
    this.comments = film[`comments`];
    this.viewedDate = film[`user_details`][`watching_date`];
  }

  static parseMovie(film) {
    return new MovieAdapter(film);
  }

  static parseMovies(films) {
    return films.map(MovieAdapter.parseMovie);
  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.comments,
      'film_info': {
        'title': this.title,
        'alternative_title': this.originalTitle,
        'total_rating': this.rating,
        'poster': this.image,
        'age_rating': this.age,
        'director': this.director,
        'writers': this.writers,
        'actors': this.actors,
        'release': {
          'date': new Date(this.releaseDate),
          'release_country': this.country,
        },
        'description': this.description,
        'genre': [...this.genres],
        'runtime': this.runtime,
      },
      'user_details': {
        [`personal_rating`]: Number(this.personalRating),
        favorite: this.isFavorite,
        watchlist: this.isInWatchlist,
        [`already_watched`]: this.isWatched,
        [`watching_date`]: new Date(this.viewedDate),
      },
    };
  }
}

export default MovieAdapter;
