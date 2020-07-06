import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import Util from './util/util.js';
import Dropdown from 'react-dropdown';
import CitySearcher from './components/CitySearcher';

function App() {
  const [city, setCity] = React.useState('');
  const [income, setIncome] = React.useState('');
  const [livingCond, setLivingCond] = React.useState('');
  const [loading, setLoading] = React.useState(null);
  const [output, setOutput] = React.useState(null);
  const [headCount, setHeadCount] = React.useState(1);

  const options = [
    'Rent inside city center',
    'Rent outside city center',
    'Mortgage inside city center',
    'Mortgage outside city center',
    'Fully owned'
  ];

  function getCosts() {
    const url = `https://cors-anywhere.herokuapp.com/https://www.numbeo.com/cost-of-living/in/${city}`;
    setLoading(<div>LOADING . . .</div>);

    axios.get(url).then(r => {
      const costs = Util.scrapeNumbeoHtml(r.data);
      const prosperity = Util.calcProsperityLv(
        income,
        getPersonalizeCost(livingCond, costs)
      );
      setOutput(
        <div>
          <h4>Prosperity:</h4>
          <div>Monthly Savings: {prosperity.leftover}</div>
          <div>Housing Cost: {prosperity.costs.housingCost.toFixed(2)}</div>
          <div>Other Expenses: {prosperity.costs.headCost.toFixed(2)}</div>
          <div>{prosperity.comment}</div>
        </div>
      );
      setLoading(null);
      setLivingCond(livingCond);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    getCosts();
  }

  function onSelect(e) {
    setLivingCond(e.value);
  }

  const getPersonalizeCost = (condition, costs) => {
    const headCostFactor = (costs.famOfFourNoRent - costs.famOfOneNoRent) / 3;
    const headCost = headCostFactor * (headCount - 1) + costs.famOfOneNoRent;
    let housingCost = 0;
    const ps = costs.sqFtPropertySuburb * 0.9;
    const pc = costs.sqFtPropertyCity * 0.9;
    const r = costs.mortgageRate / 100 / 12;
    const n = 30 * 12;
    const a = Math.pow(1 + r, n);
    switch (condition) {
      case 'Rent inside city center':
        if (headCount > 2) {
          housingCost += costs.threeBedCity;
        } else {
          housingCost += costs.oneBedCity;
        }
        break;
      case 'Rent outside city center':
        if (headCount > 2) {
          housingCost += costs.threeBedSuburb;
        } else {
          housingCost += costs.oneBedSuburb;
        }
        break;
      case 'Mortgage inside city center':
        if (headCount > 2) {
          const calculatedPayment =
            (pc * (600 + 170 * (headCount - 2)) * (r * a)) / (a - 1);
          housingCost += calculatedPayment;
        } else {
          const calculatedPayment = (pc * 600 * (r * a)) / (a - 1);
          housingCost += calculatedPayment;
        }
        break;
      case 'Mortgage outside city center':
        if (headCount > 2) {
          const calculatedPayment =
            (ps * (750 + 220 * (headCount - 2)) * (r * a)) / (a - 1);
          housingCost += calculatedPayment;
        } else {
          const calculatedPayment = (ps * 750 * (r * a)) / (a - 1);
          housingCost += calculatedPayment;
        }
        break;
    }
    return { headCost, housingCost, totalCost: headCost + housingCost };
  };

  return (
    <div className='App'>
      <form className='form' onSubmit={handleSubmit}>
        <CitySearcher className='field' setCity={setCity} />
        <label className='field'>
          Monthly Take Home Income:
          <input
            value={income}
            onChange={e => setIncome(Number(e.target.value))}
          ></input>
        </label>
        <label className='field'>
          Number of Dependents Including Self:
          <input
            value={headCount}
            onChange={e => setHeadCount(Number(e.target.value))}
          ></input>
        </label>
        <label className='field'>
          Housing Situation:
          <Dropdown
            options={options}
            onChange={onSelect}
            value={livingCond || 'Select an option'}
          />
        </label>
        <button className='submit' type='submit'>Get Costs</button>
      </form>
      <div>{loading}</div>
      <div>{output}</div>
    </div>
  );
}

export default App;
