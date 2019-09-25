export default class ModelAdapter {
  constructor(data) {
    this.id = data[`id`];
    this.image = data[`film_info`][`poster`];
    this.title = data[`film_info`][`title`];
    this.originalTitle = data[`film_info`][`alternative_title`] || ``;
    this.rating = data[`film_info`][`total_rating`];
    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.releaseDate = new Date(data[`film_info`][`release`][`date`]);
    this.runtime = data[`film_info`][`runtime`];
    this.country = data[`film_info`][`release`][`release_country`];
    this.genres = data[`film_info`][`genre`];
    this.description = data[`film_info`][`description`];
    this.age = data[`film_info`][`age_rating`];
    this.personalRating = data[`user_details`][`personal_rating`] || null;
    this.isFavorite = Boolean(data[`user_details`][`favorite`]);
    this.isInWatchlist = Boolean(data[`user_details`][`watchlist`]);
    this.isWatched = Boolean(data[`user_details`][`already_watched`]);
    this.comments = data[`comments`];
  }

  static parseMovie(data) {
    return new ModelAdapter(data);
  }

  static parseMovies(data) {
    console.log(data[0]);
    return data.map(ModelAdapter.parseMovie);
  }

  toRAW() {
    const result = {
      'id': this.id,
      'comments': ['511', '513', '512'],
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
          'date': `1994-03-06T05:08:21.536Z`,
          'release_country': this.country,
        },
        'description': this.description,
        'genre': this.genres,
        'runtime': this.runtime,
      },
      'user_details': {
        [`personal_rating`]: this.personalRating,
        favorite: this.isFavorite,
        watchlist: this.isInWatchlist,
        [`already_watched`]: this.isWatched,
        [`watching_date`]: new Date().toISOString(),
      },
    };

    console.log(result);
    return result;
  }
}
