import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {countUniqGenres} from "../util";

export default class StatisticController {
  constructor(movies) {
    this._genres = countUniqGenres(movies);
    this._renderChart();
  }

  _renderChart() {
    const ctx = document.querySelector(`.statistic__chart`);
    return new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [...Object.keys(this._genres)],
        datasets: [{
          data: [...Object.values(this._genres)],
          backgroundColor: `#ffe800`,
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
          }],
        },
      },
    });
  }
}
