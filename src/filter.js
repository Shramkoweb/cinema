/* Вычесляем количество фильмов подходящих под фильтр */
export const getFilterCount = (movies) => {
  let watchlistCount = 0;
  let historyCount = 0;
  let favoriteCount = 0;

  for (let movie of movies) {
    if (movie.isFavorite) {
      favoriteCount++;
    }
    if (movie.isWatched) {
      historyCount++;
    }
    if (movie.isInWatchlist) {
      watchlistCount++;
    }
  }

  return [
    {
      title: `watchlist`,
      count: watchlistCount
    },
    {
      title: `history`,
      count: historyCount
    },
    {
      title: `favorites`,
      count: favoriteCount
    },
  ];
};
