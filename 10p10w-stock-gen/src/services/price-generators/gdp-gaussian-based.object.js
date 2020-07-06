const GdpGaussianGenerator = {
  // constructor(initialPrice, days, dayOffset = 0) {
  //     GdpGaussianGenerator.price = GdpGaussianGenerator._generatePrices(initialPrice, days, dayOffset);
  // }

  _createRandomDay: (initialPrice, volatility, gdp) => {
    var price = initialPrice;
    var openPrice = price;
    var highestPriceToday = price;
    var lowestPriceToday = price;
    var hourlyVol = volatility / Math.sqrt(18 * 365);
    for (var h = 0; h < 12; h++) {
      price = price * GdpGaussianGenerator._gaussian(1 + gdp / 3, hourlyVol)();
      price > highestPriceToday ? highestPriceToday = price : null;
      price < lowestPriceToday ? lowestPriceToday = price : null;
    }
    var closePrice = price;
    return {
      day: null,
      open: openPrice,
      high: highestPriceToday,
      low: lowestPriceToday,
      close: closePrice,
      vol: null,
      highestClose: 0,
      highestCloseDaysAgo: 0
    };
  },

  _getNewVolatility: (volArray, priceArray, highestClose, highestCloseDaysAgo) => {
    var newVol;
    const prices = [...priceArray];
    const vol = [...volArray];

    prices.splice(0, 0, priceArray[0]);
    prices.splice(0, 0, priceArray[0]);
    prices.splice(0, 0, priceArray[0]);
    vol.splice(0, 0, volArray[0]);

    if (highestCloseDaysAgo < 365) {
      highestCloseDaysAgo = 0;
    }

    const lastPrice = prices.length - 1;
    const lastVol = vol.length - 1;
    const modifier = (prices[lastPrice].close) / ((highestClose - prices[lastPrice].close) / (0.01 + (highestCloseDaysAgo / 2000)) + prices[lastPrice].close);

    var priceChange = prices[lastPrice].close / prices[lastPrice - 1].close - 1;
    var prevPriceChange = prices[lastPrice - 1].close / prices[lastPrice - 2].close - 1;
    var prevPrevPriceChange = prices[lastPrice - 2].close / prices[lastPrice - 3].close - 1;

    if (priceChange >= 0) {
      const delta = (1 - 1 / (Math.pow(700 * priceChange + Math.abs(60 * prevPriceChange), 1.5) + 1)) * ((vol[lastVol] - 0.5 * vol[lastVol - 1] - 0.04));
      newVol = GdpGaussianGenerator._gaussian(vol[lastVol] - modifier * delta, 0.002)();
    } else {
      const mean = -2 * priceChange - 0.6 * prevPriceChange - 0.3 * prevPrevPriceChange;
      newVol = vol[lastVol] + GdpGaussianGenerator._gaussian(mean, 0.002)();
    }
    if (newVol > 1.2) {
      newVol = 0.8;
    }
    if (newVol > 0.45) {
      if (vol[lastVol] > 0.35) {
        newVol = newVol * 0.9;
        if (vol[lastVol - 1] > 0.3) {
          newVol = newVol * 0.9;
          if (vol[lastVol - 2] > 0.3) {
            newVol = newVol * 0.9;
            if (vol[lastVol - 3] > 0.3) {
              newVol = newVol * 0.8;

            }
          }
        }
      }
    }
    return newVol;
  },

  generatePrices: (initialPrice, days, dayOffset) => {
    var prices = [];
    var volatility = [0.1];
    var highestClose = 0;
    var highestCloseDaysAgo = 0;
    var openPrice = initialPrice;
    for (var d = dayOffset; d < days + dayOffset; d++) {
      const vol = volatility[d - dayOffset];
      const dailyGdpGrowth = GdpGaussianGenerator._getForwardGdpGrowth(d);

      const price = GdpGaussianGenerator._createRandomDay(openPrice, vol, dailyGdpGrowth);
      price.day = d;
      price.vol = vol;
      price.highestClose = highestClose;
      price.highestCloseDaysAgo = highestCloseDaysAgo;
      prices.push(price);
      if (price.close > highestClose) {
        highestClose = price.close;
        highestCloseDaysAgo = 0;
      } else {
        highestCloseDaysAgo++;
      }

      const newVol = GdpGaussianGenerator._getNewVolatility(volatility, prices, highestClose, highestCloseDaysAgo);
      volatility.push(newVol);
      openPrice = price.close * GdpGaussianGenerator._gaussian(1, newVol / Math.sqrt(6 * 365))();

    }
    return prices;
  },

  _getForwardGdpGrowth: (day) => {
    var date = new Date(day * SECONDS_IN_A_DAY);
    var nextQuarterDate = GdpGaussianGenerator._getNextQuarterDate(date);
    var gdp = QUARTERLY_GDP_ARRAY.get(GdpGaussianGenerator._formatDate(nextQuarterDate));
    if (gdp) {
      if (gdp.GDPGROWTH < 0) {
        return ((gdp.GDPGROWTH - 0.0028) / 66);
      } else if (gdp.GDPGROWTH < 0.0015) {
        return ((gdp.GDPGROWTH - 0.001) / 66);
      } else {
        return ((gdp.GDPGROWTH + 0.0015) / 66 / 2);
      }
    } else {
      return 0.00002;
    }
  },

  _getNextQuarterDate: (d) => {
    var month = d.getMonth();
    var nextQuarter = Math.floor(month / 3) * 3 + 3;
    var yearIncrement = 0;
    if (nextQuarter === 12) {
      nextQuarter = 0;
      yearIncrement = 1;
    }

    return new Date(d.getFullYear() + yearIncrement, nextQuarter, 1);
  },

  _gaussian: (mean, stdev) => {
    var y2;
    var use_last = false;
    return function () {
      var y1;
      if (use_last) {
        y1 = y2;
        use_last = false;
      } else {
        var x1, x2, w;
        do {
          x1 = 2.0 * Math.random() - 1.0;
          x2 = 2.0 * Math.random() - 1.0;
          w = x1 * x1 + x2 * x2;
        } while (w >= 1.0);
        w = Math.sqrt((-2.0 * Math.log(w)) / w);
        y1 = x1 * w;
        y2 = x2 * w;
        use_last = true;
      }

      var retval = mean + stdev * y1;
      if (retval > 0)
        return retval;
      return -retval;
    }
  },

  _formatDate: (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}