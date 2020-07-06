import React from 'react';
import axios from 'axios';

function CitySearcher(props) {
  const [search, setSearch] = React.useState('');
  const [dropdown, setDropdown] = React.useState(null);

  const searchCity = e => {
    setSearch(e.target.value);
    const term = e.target.value.replace(/ /g, '-');
    props.setCity(term);
    const url = `https://cors-anywhere.herokuapp.com/https://www.numbeo.com/common/CitySearchJson?term=${term}`;

    axios.get(url).then(r => {
      // setCityList(r.data);
      setDropdown(
        <ul className='city-list'>
          {r.data.map(c => {
            return <li onClick={() => selectCity(c.label)}>{c.label}</li>;
          })}
        </ul>
      );
    });
  };

  const selectCity = e => {
    const city = e.slice(0, e.indexOf(','));
    setSearch(city);
    props.setCity(city);
    setDropdown(null);
  };

  return (
    <div>
      <label className='field'>
        Find Your City:
        <input value={search} onChange={searchCity}></input>
      </label>
      {dropdown}
    </div>
  );
}

export default CitySearcher;
