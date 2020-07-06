import React, { useEffect } from 'react';

function Count(props) {
  const callback = props.callback;
  const [countdown, setCountdown] = React.useState(props.time);

  React.useEffect(() => {
    if (countdown === 0) {
      callback();
    }
    countdown > 0 &&
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
  }, [countdown]);

  return <div className='Count'>{countdown}</div>;
}

export default Count;
