import React, { useEffect } from 'react';

function Bubble(props) {
  const onClick = props.onClick;
  const [randBubble, setBubble] = React.useState(
    50 + Math.floor(Math.random() * 150)
  );
  const randTime = 0.7 + 0.8 * Math.random();

  useEffect(() => {
    setTimeout(() => {
      setBubble(0);
    }, 1);
  }, []);

  return (
    <div
      className='bubble'
      style={{
        width: randBubble + 'px',
        height: randBubble + 'px',
        transition: `all ${randTime}s linear`,
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={onClick}
    ></div>
  );
}

export default Bubble;
