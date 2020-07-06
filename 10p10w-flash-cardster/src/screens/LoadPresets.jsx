import React from 'react';
import axios from 'axios';

function LoadPresets(props) {
  const [loading, setLoading] = React.useState('');
  const getFlags = () => {
    setLoading('getFlags');
    const url =
      'https://cdn.jsdelivr.net/gh/risan/country-flag-emoji-json@master/json/flag-emojis.pretty.json';
    axios.get(url).then(r => {
      r.data.map(c => {
        props.addCards(c.emoji, c.name);
      });
      setTimeout(() => {
        setLoading('');
      }, 150);
    });
  };

  const getCapital = () => {
    setLoading('getCapital');
    const url =
      'https://cdn.jsdelivr.net/gh/samayo/country-json@master/src/country-by-capital-city.json';
    axios.get(url).then(r => {
      r.data.map(c => {
        props.addCards(c.country, c.city);
      });
      setTimeout(() => {
        setLoading('');
      }, 150);
    });
  };
  return (
    <div className='LoadPresets'>
      <button className='add-btn' onClick={getCapital}>
        <div
          className={(() => {
            if (loading === 'getCapital') {
              return 'loader';
            }
            return '';
          })()}
        ></div>
        {loading === 'getCapital' ? '' : 'Load Country Capitals Quiz'}
      </button>
      <button className='add-btn' onClick={getFlags}>
        <div
          className={(() => {
            if (loading === 'getFlags') {
              return 'loader';
            }
            return '';
          })()}
        ></div>
        {loading === 'getFlags' ? '' : 'Load Country Flags Quiz'}
      </button>
    </div>
  );
}

export default LoadPresets;
