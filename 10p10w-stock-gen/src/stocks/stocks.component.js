var tempCompany = new Company('Random', 'RND');
var StockComponent = {

  createRandom: () => {
    tempCompany.stockPrice = GdpGaussianGenerator.generatePrices(100, 11010, 7300);
    tempCompany.createChart('chartContainer');
  },

  toggleLogAxis: () => {
    if (tempCompany.isLogScale) {
      tempCompany.createChart('chartContainer');
    } else {
      tempCompany.createLogChart('chartContainer');
    }
  }
};