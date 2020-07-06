import React, { useEffect } from 'react';
import BubbleCtn from './BubbleCtn';

function BubbleField(props) {
  const [bubbleA, setBubbleA] = React.useState([]);
  const [bubbleB, setBubbleB] = React.useState([]);
  const [bubbleC, setBubbleC] = React.useState([]);

  const randBubbleA = () => {
    setTimeout(() => {
      const rand = Math.random() * 4;
      if (rand < 1) {
        setBubbleA(<BubbleCtn pop={props.pop} />);
        setTimeout(() => {
          setBubbleA(null);
          randBubbleA();
        }, 1500);
        return;
      }
      randBubbleA();
    }, 100);
  };
  const randBubbleB = () => {
    setTimeout(() => {
      const rand = Math.random() * 4;
      if (rand < 1) {
        setBubbleB(<BubbleCtn pop={props.pop} />);
        setTimeout(() => {
          setBubbleB(null);
          randBubbleB();
        }, 1500);
        return;
      }
      randBubbleB();
    }, 100);
  };
  const randBubbleC = () => {
    setTimeout(() => {
      const rand = Math.random() * 4;
      if (rand < 1) {
        setBubbleC(<BubbleCtn pop={props.pop} />);
        setTimeout(() => {
          setBubbleC(null);
          randBubbleC();
        }, 1500);
        return;
      }
      randBubbleC();
    }, 100);
  };
  useEffect(() => {
    if (props.start) {
      randBubbleA();
      randBubbleB();
      randBubbleC();
    }
  }, [props.start]);

  return (
    <div className='BubbleField'>
      {bubbleA} {bubbleB} {bubbleC}
    </div>
  );
}

export default BubbleField;
