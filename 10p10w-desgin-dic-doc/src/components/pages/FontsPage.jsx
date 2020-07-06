import React from 'react';
import './FontsPage.scss';
import baseFonts from '../../properties/size/font.json';
import { copyToClipboard } from '../../util/util';

function FontsPage() {
  const fonts = baseFonts.font;
  return (
    <div>
      <h2>Fonts Sizes</h2>
      <p className='descriptor-paragraph'>
        All font sizes should be one of the size below. The heading font sizes
        are intended for headings and titles. The medium size is for all texts
        and paragraphs. The small text is for captions.
      </p>
      <div className='font-grid'>
        {Object.entries(fonts).map(([font, { value, comment }]) => {
          const style = { fontSize: value };
          return (
            <div className='font-card'>
              <div className='font-card__value' style={style}>
                Aa
              </div>
              <div className='font-card__text'>
                <p>{value}</p>
                <p
                  className='copy-pill'
                  onClick={() => copyToClipboard(`$font-${font}`)}
                >
                  $font-{font}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FontsPage;
