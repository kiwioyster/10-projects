class Company {
  constructor(companyName, ticker) {
    this.stockPricesData = [];
    this.companyName = companyName;
    this.ticker = ticker;
    this.isLogScale = false;
  }

  set stockPrice(d) {
    this.stockPricesData = d;
  }

  set newStockPrice(d) {
    this.stockPrice.append(d);
  }

  createChart(chartContainerName) {
    var data = this._getFormattedData(this.stockPricesData);
    Highcharts.stockChart(chartContainerName, this._getStockChartObj(data));
    this.isLogScale = false;
  }

  createLogChart(chartContainerName) {
    var data = this._getFormattedData(this.stockPricesData);
    var chartObj = this._getStockChartObj(data);
    chartObj['yAxis'] = {
      type: 'logarithmic'
    };
    Highcharts.stockChart(chartContainerName, chartObj);
    this.isLogScale = true;
  }

  _getStockChartObj(data) {
    return {
      chart: {
        style: {
          fontFamily: 'Lato',
          color: 'rgb(37, 56, 66)'
        }
      },
      title: {
        text: `${this.companyName} Stock Prices`,
        color: 'rgb(37, 56, 66)'
      },

      rangeSelector: {
        buttons: [{
          type: 'month',
          count: 18,
          text: '18m'
        }, {
          type: 'year',
          count: 5,
          text: '5y'
        }, {
          type: 'year',
          count: 20,
          text: '20y'
        }],
        selected: 1,
        inputEnabled: false
      },

      series: [{
        name: this.ticker,
        type: 'candlestick',
        data,
        tooltip: {
          valueDecimals: 2
        }
      }],

      colors: ['#2E5266']
    };
  }

  _getFormattedData(days) {
    // var date = new Date();
    // var ms = date.getTime();
    var formattedDays = days.map(d => {
      return [SECONDS_IN_A_DAY * d.day, d.open, d.high, d.low, d.close];
    })
    return formattedDays;
  }
}