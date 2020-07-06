(() => {
  const Http = new XMLHttpRequest();
  const url = 'https://stats.oecd.org/sdmx-json/data/DP_LIVE/USA.QGDP.TOT.PC_CHGPP.Q/OECD?json-lang=en&dimensionAtObservation=allDimensions&startPeriod=1951-Q2&endPeriod=2019-Q4';
  Http.open('GET', url);
  Http.send();
  Http.onreadystatechange = (e) => {
    const r = JSON.parse(Http.response);
    const dateArray = r.structure.dimensions.observation[5].values.map((d) => {
      d.id = d.id.replace('Q1', '01-01').replace('Q2', '04-01').replace('Q3', '07-01').replace('Q4', '10-01');
      return d.id
    });
    const gdpArray = Object.values(r.dataSets[0].observations).map((d) => {
      return d[0] / 100
    });
    const datedGdp = dateArray.map((d, i) => {
      return {
        DATE: d,
        GDPGROWTH: gdpArray[i]
      };
    });
    QUARTERLY_GDP_ARRAY.set(datedGdp);
  }
})();