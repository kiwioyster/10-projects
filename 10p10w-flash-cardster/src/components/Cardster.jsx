import React from 'react';

function Cardster(props) {
  const cardClick = props.cardClick;
  const children = props.children;
  const flipped = props.flipped;

  return (
    <div
      className={(() => {
        let klass = 'Cardster';
        if (flipped) {
          klass += ' Cardster--flipped';
        }
        return klass;
      })()}
      onClick={cardClick}
    >
      {children}
    </div>
  );
}

export default Cardster;
