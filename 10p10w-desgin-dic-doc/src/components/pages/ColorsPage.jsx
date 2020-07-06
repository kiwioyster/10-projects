import React from 'react';
import './ColorsPage.scss';
import baseColors from '../../properties/color/base.json';
import { copyToClipboard } from '../../util/util';

function ColorsPage() {
  const colors = baseColors.color;

  return (
    <div>
      <h2>Brand Colors</h2>
      <p className='descriptor-paragraph'>
        Generic colors to be used in all applications. The rose red and sea
        green are the main brand colors. They should be used in CTAs where
        actions are required. The remaining colors should be used in backgrounds
        and supplement the main brand colors. Each color has three different
        shades to aid accessibility.
      </p>
      <div className='color-grid'>
        {Object.entries(colors).map(([color, shades]) => {
          return Object.entries(shades).map(([shade, hex]) => {
            console.log(color, shade, hex.value);
            const style = { backgroundColor: hex.value };
            const variable = `$color-${color}-${shade}`;

            return (
              <div className='color-card'>
                <div className='color-card__value' style={style}></div>
                <div className='color-card__text'>
                  <p>{hex.value}</p>
                  <p
                    className='copy-pill'
                    onClick={() => copyToClipboard(variable)}
                  >
                    {variable}
                  </p>
                </div>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}

export default ColorsPage;
