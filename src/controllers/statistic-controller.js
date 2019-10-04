import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import moment from "moment";
import StatisticChart from "../components/statistic-chart";
import StatisticRank from "../components/statistic-rank";
import StatisticRecap from "../components/statistic-recap";
import Statistics from "../components/statistics";
import {
  countUniqGenres,
  getDurationWatchedFilms,
  getFavoriteGenre,
  getUserRating,
  renderElement,
  unrenderElement,
} from "../utils";
import {Position, StatisticPeriod} from "../constants";

export default class StatisticController {
  constructor(container) {
    this._container = container;
    this._statisticComponent = new Statistics();
    this._statisticChart = new StatisticChart();
    this._statistickRank = new StatisticRank({userRank: {}});
    this._statisticRecap = new StatisticRecap({watchedMovies: {}, totalDuration: {}, topGenre: {}});

    this.hide();
  }

  hide() {
    this._statisticComponent.getElement().classList.add(`visually-hidden`);
  }

  show(films) {
    this._films = films.filter((elem) => elem.isWatched);
    this._originalFilms = this._films.slice();
    this._statisticComponent.getElement().classList.remove(`visually-hidden`);
    this._renderStatisticContainer();
  }

  _renderStatisticContainer() {
    this._unrenderStatistics();
    this._statisticComponent = new Statistics();
    this._onStatistickChange();
    renderElement(this._container, this._statisticComponent.getElement());
    this._renderChart();
  }

  _renderUserRankElement() {
    this._unrenderRank();
    this._userRank = this._films.length ? getUserRating(this._films) : `-`;
    this._statistickRank = new StatisticRank({userRank: this._userRank});
    renderElement(this._statisticComponent.getElement(), this._statistickRank.getElement(), Position.AFTERBEGIN);
  }

  _renderUserRecap() {
    this._unrenderRecap();
    const getTopGenre = getFavoriteGenre(this._films);
    const getTotalDuration = getDurationWatchedFilms(this._films);

    this._statisticRecap = new StatisticRecap({
      watchedMovies: this._films.length,
      totalDuration: getTotalDuration,
      topGenre: getTopGenre,
    });

    renderElement(this._statisticComponent
      .getElement()
      .querySelector(`.statistic__filters`), this._statisticRecap.getElement(), Position.AFTEREND);
  }

  _renderUpdatedChart(originalFilms, filteredPeriod) {
    const startDate = moment().startOf(filteredPeriod).format(`YYYY-MM-DD`);
    this._films = originalFilms.filter((film) => {
      const dateViewed = moment(film.viewedDate).format(`YYYY-MM-DD`);
      return moment(dateViewed).isSame(startDate, filteredPeriod) && film;
    });
    this._renderChart();
  }

  _renderChart() {
    const ctx = this._statisticChart.getElement();
    this._unicGenres = countUniqGenres(this._films);

    this._renderUserRankElement();
    this._renderUserRecap();
    renderElement(this._statisticComponent
      .getElement()
      .querySelector(`.statistic__chart-wrap`), this._statisticChart.getElement());

    this._chart = new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: Object.keys(this._unicGenres),
        datasets: [{
          data: Object.values(this._unicGenres),
          backgroundColor: `#ffe800`,
          anchor: `start`,
          hoverBackgroundColor: `#fff`,
        }],
      },
      options: {
        plugins: {
          datalabels: {
            fontSize: 20,
            color: `#fff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          },
        },
        legend: {display: false},
        animation: {
          easing: `easeInQuart`,
        },
        scales: {
          yAxes: [{
            barThickness: 20,
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              fontColor: `#fff`,
              padding: 80,
              fontSize: 16,
            },
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
        },
        tooltips: {
          displayColors: false,
          backgroundColor: `#000`,
          bodyFontColor: `#fff`,
          borderWidth: 1,
          cornerRadius: 2,
          xPadding: 10,
          yPadding: 10,
        },
      },
    });

    return 0;
  }

  _unrenderStatistics() {
    this._unrenderRank();
    this._unrenderChart();
    unrenderElement(this._statisticComponent.getElement());
    this._statisticComponent.removeElement();
  }

  _unrenderChart() {
    unrenderElement(this._statisticChart.getElement());
    this._statisticChart.removeElement();
  }

  _unrenderRecap() {
    unrenderElement(this._statisticRecap.getElement());
    this._statisticRecap.removeElement();
  }

  _unrenderRank() {
    unrenderElement(this._statistickRank.getElement());
    this._statistickRank.removeElement();
  }

  _onStatistickChange() {
    const onMenuElemClick = (evt) => {
      switch (evt.target.value) {

        case StatisticPeriod.ALL_TIME:
          this._films = this._originalFilms;
          this._renderChart();
          break;

        case StatisticPeriod.TODAY:
          this._renderUpdatedChart(this._originalFilms, `day`);
          break;

        case StatisticPeriod.WEEK:
          this._renderUpdatedChart(this._originalFilms, `week`);
          break;

        case StatisticPeriod.MONTH:
          this._renderUpdatedChart(this._originalFilms, `month`);
          break;

        case StatisticPeriod.YEAR:
          this._renderUpdatedChart(this._originalFilms, `year`);
          break;

        default:
          throw new Error(`Incorrect value`);
      }
    };

    this._statisticComponent.getElement().querySelectorAll(`.statistic__filters-input`).forEach((elem) => {
      elem.addEventListener(`click`, onMenuElemClick);
    });
  }
}
