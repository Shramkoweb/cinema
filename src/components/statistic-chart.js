import AbstractComponent from "./absctract-component";

class StatisticChart extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<canvas class="statistic__chart" width="1000"></canvas>`.trim();
  }
}

export default StatisticChart;
