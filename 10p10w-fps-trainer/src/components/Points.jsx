import React, { useEffect } from 'react';
import Count from './Count';
import BubbleField from './BubbleField';

function Points(props) {
  let clicks = 0;

  const incrementPop = () => {
    props.incrementPt(1);
  };

  const incrementClick = () => {
    props.incrementClick(1);
  };

  return (
    <div className='Points'>
      <div onClick={incrementClick} className='bg'></div>
      Time left
      <Count time={30} callback={props.gameEnd} />
      <BubbleField start={props.start} pop={incrementPop} />
    </div>
  );
}

export default Points;
