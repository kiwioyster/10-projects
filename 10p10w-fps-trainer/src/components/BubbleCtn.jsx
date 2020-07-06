import React, { useEffect } from 'react';
import Bubble from './Bubble';
import useWindowDimensions from '../WindowSizeUtil';
import bubbleSound from '../assets/bubble.wav';

function BubbleCtn(props) {
  const windowDim = useWindowDimensions();
  const [hidden, setHidden] = React.useState(false);
  const [audio] = React.useState(new Audio(bubbleSound));

  const getRandCoord = () => {
    return {
      width: windowDim.width * 0.1 + Math.random() * windowDim.width * 0.8,
      height: windowDim.height * 0.1 + Math.random() * windowDim.height * 0.8,
    };
  };
  const onClick = () => {
    setHidden(true);
    audio.play();
    props.pop();
  };

  const randCoord = getRandCoord();
  return (
    <div
      className='bubble-ctn'
      style={{
        display: hidden ? 'none' : 'inherit',
        left: randCoord.width,
        top: randCoord.height,
      }}
    >
      <Bubble onClick={onClick}></Bubble>
    </div>
  );
}

export default BubbleCtn;
