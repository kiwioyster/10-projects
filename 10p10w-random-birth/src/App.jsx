import React from 'react';
import axios from 'axios';
import './App.scss';
import Results from './components/Results';

function App() {
  const [state, setState] = React.useState({});
  const [country, setCountry] = React.useState('');
  const [incomeLv, setIncome] = React.useState('');
  const onClick = () => {
    setState({ ...state, loading: true });
    const popUrl =
      'https://cors-anywhere.herokuapp.com/https://pkgstore.datahub.io/core/population/population_json/data/43d34c2353cbd16a0aa8cadfb193af05/population_json.json';
    // birth per 1000 people each year
    const birthUrl =
      'https://cors-anywhere.herokuapp.com/https://pkgstore.datahub.io/world-bank/sp.dyn.cbrt.in/data_json/data/fc9f722a3251d0ca62802c24629a46ba/data_json.json';
    const incomeUrl =
      'https://cors-anywhere.herokuapp.com/https://pkgstore.datahub.io/opendatafortaxjustice/incomelevel/incomelevel_json/data/692c871d2e7504c9e2a6b762a44e8487/incomelevel_json.json';
    const popPromise = axios.get(popUrl);
    const birthPromise = axios.get(birthUrl);
    const incomePromise = axios.get(incomeUrl);
    Promise.all([popPromise, birthPromise, incomePromise]).then(
      ([pop, birth, income]) => {
        const tpop = _getTrimmed(pop.data);
        const tbirth = _getTrimmed(birth.data);
        const birthPerYr = _getBirthPerYear(tpop, tbirth);
        const totalBirth = _getTotal(birthPerYr, 'birth');
        let rand = Math.random() * totalBirth;

        birthPerYr.some((d) => {
          rand -= d.birth;
          if (rand <= 0) {
            console.log(d);

            setCountry(d.country);
            setIncome(_getIncomeLv(d.country, income.data));
            return true;
          }
        });
      }
    );
  };

  const _getIncomeLv = (country, incomeArray) => {
    let incomeLv;
    incomeArray.some((income) => {
      if (income.Jurisdiction === "C\u00f4te d'Ivoire") {
        income.Jurisdiction = "Cote d'Ivoire";
      } else if (income.Jurisdiction === 'Cura\u00e7ao') {
        income.Jurisdiction = 'Curacao';
      } else if (income.Jurisdiction === 'S\u00e3o Tom\u00e9 and Principe') {
        income.Jurisdiction = 'Sao Tome and Principe';
      }
      let match = true;

      const splitJurisdiction = income.Jurisdiction.replace(
        /[.,’']/g,
        ''
      ).split(/[\s]+/);
      const splitCountry = country.replace(/[.,’']/g, '').split(/[\s]+/);

      if (splitCountry.length !== splitJurisdiction.length) {
        match = false;
      } else if (splitCountry.length > 1) {
        splitCountry.forEach((c) => {
          if (splitJurisdiction.indexOf(c) < 0) {
            match = false;
          }
        });
      } else if (splitCountry[0] !== splitJurisdiction[0]) {
        match = false;
      }
      if (match) {
        incomeLv = income['Income level'];
        return true;
      }
    });
    return incomeLv;
  };

  const _getTrimmed = (data) => {
    const sliceIndex = data.findIndex(
      (d) => d['Country Name'] === 'Afghanistan'
    );
    const trimmed = data.slice(sliceIndex);
    return trimmed.filter((t) => {
      if (t['Country Code'] === 'ERI') {
        return t.Year === 2010;
      }
      return t.Year > 2015;
    });
  };

  const _getTotal = (data, fieldName) => {
    let total = 0;
    data.forEach((d) => {
      total += d[fieldName];
    });
    return total;
  };

  const _getBirthPerYear = (pop, birth) => {
    return birth.map((b) => {
      if (!pop.find((p) => p['Country Name'] === b['Country Name'])) {
        console.error('Not Found', b);
        return null;
      }
      const countryPop = pop.find(
        (p) => p['Country Name'] === b['Country Name']
      ).Value;
      return {
        code: b['Country Code'],
        country: b['Country Name'],
        birth: countryPop * (b.Value / 1000),
      };
    });
  };
  return (
    <div className='App'>
      {state.loading ? (
        <Results country={country} income={incomeLv} update={onClick} />
      ) : (
        <button className='birth-btn' onClick={onClick}>
          Birth
        </button>
      )}
    </div>
  );
}

export default App;
