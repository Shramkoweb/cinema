import PageController from "./controllers/page-controller";
import Statistics from "./components/statistics";
import API from "./api";
import StatisticController from "./controllers/statistic-controller";
import SearchController from "./controllers/search-controller";

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/cinemaddict/`;

const mainElement = document.querySelector(`.main`);

const onDataChange = (actionType, updatedFilm) => {
  switch (actionType) {
    case `update`:
      api.updateMovie({
        id: updatedFilm.id,
        data: updatedFilm.toRAW(),
      })
        .then(() => api.getMovies())
        .then((movies) => {
          if (filmsControllerInstance._isSearchActive) {
            const searchController = new SearchController(filmsControllerInstance._phrase, movies);

            const sortedFilms = searchController.search();
            filmsControllerInstance._renderFilms(sortedFilms, filmsControllerInstance._filmsContainerElement);
          } else {
            filmsControllerInstance._renderUpdatesFilms();
          }
        });
      break;
  }
};

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const filmsControllerInstance = new PageController(mainElement, onDataChange);


api.getMovies().then((movies) => {
  const statisticsComponent = new Statistics(movies);

  filmsControllerInstance.init(movies);

  mainElement.appendChild(statisticsComponent.getElement());
  const statisticsLink = mainElement.querySelector(`.main-navigation__item--additional`);
  const showAllLink = mainElement.querySelector(`.main-navigation__item`);


  const showStatistics = (evt) => {
    evt.preventDefault();

    statisticsComponent.show();
    filmsControllerInstance.hide();

    const chart = new StatisticController(movies);
    chart._renderChart();
  };

  const showMovies = (evt) => {
    evt.preventDefault();

    statisticsComponent.hide();
    filmsControllerInstance.show();
  };

  statisticsLink.addEventListener(`click`, showStatistics);
  showAllLink.addEventListener(`click`, showMovies);
});
