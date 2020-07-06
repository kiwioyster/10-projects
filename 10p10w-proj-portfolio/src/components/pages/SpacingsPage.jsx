import React from 'react';
import './SpacingsPage.scss';
import baseSpacings from '../../properties/size/spacing.json';
import { copyToClipboard } from '../../util/util';

function SpacingPage() {
  const spacings = baseSpacings.spacing;
  return (
    <div>
      <h2>Spacings Sizes</h2>
      <p className='descriptor-paragraph'>
        The spacing deals with spaces between visual components and sizes of
        these components. The smaller sizes should be used to separate related
        contents while the larger sizes should be use to define card
        width/height and navigation width/height. Multiples of each spacing size
        is also allowed to be used.
      </p>
      <div className='spacing-grid'>
        {Object.entries(spacings).map(([spacing, { value }]) => {
          const style = { height: value, width: value };
          console.log(style);
          return (
            <div className='spacing-card'>
              <div className='spacing-card__value'>
                <div className='spacing-card__space-square' style={style}></div>
              </div>
              <div className='spacing-card__text'>
                <p>{value}</p>
                <p
                  className='copy-pill'
                  onClick={() => copyToClipboard(`$spacing-${spacing}`)}
                >
                  $spacing-{spacing}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SpacingPage;
