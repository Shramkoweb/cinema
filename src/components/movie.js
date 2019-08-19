/* Возврат активного класса для елемента */
const elementAddActiveClass = (isActive) => {
  return `${isActive ? `active` : ``}`;
};


export const getMovieTemplate = ({
  title,
  rating,
  releaseDate,
  runtime,
  genres,
  image,
  description,
  comments,
  isFavorite,
  isWatched,
  isInWatchlist,
}) => {
  return `
    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${new Date(releaseDate).getFullYear()}</span>
        <span class="film-card__duration">${runtime}h</span>
        <span class="film-card__genre">${[...genres][0]}</span>
      </p>
      <img src="./images/posters/${image}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--${elementAddActiveClass(isInWatchlist)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--${elementAddActiveClass(isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--${elementAddActiveClass(isFavorite)}">Mark as favorite</button>
      </form>
    </article>
  `.trim();
};
