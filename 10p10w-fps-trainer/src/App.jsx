import React, { useEffect } from 'react';
import './App.scss';
import Count from './components/Count';
import Points from './components/Points';

function App() {
  console.log('rerender app');

  const [start, setStart] = React.useState(false);
  const [count, setCount] = React.useState(false);
  const [infoClass, setInfoClass] = React.useState('');
  const [scoreClass, setScoreClass] = React.useState('');
  let pt = 0;
  let clicks = 0;
  const onStart = () => {
    setScoreClass('');
    setInfoClass('');
    setCount(true);
  };
  const countComplete = () => {
    setCount(false);
    setStart(true);
  };
  const gameEnd = () => {
    console.log('end');
    if (pt > 0) {
      setScoreClass('score--show');
      localStorage.setItem('pt', pt);
      localStorage.setItem('clicks', clicks);
      localStorage.setItem('acc', Math.round((pt * 100) / (pt + clicks)));
      localStorage.setItem(
        'points',
        Math.round((pt * pt * 100) / (pt + clicks))
      );
      const highSc = localStorage.getItem('highSc');
      if (highSc) {
        if (highSc < Math.round((pt * pt * 100) / (pt + clicks))) {
          localStorage.setItem(
            'highSc',
            Math.round((pt * pt * 100) / (pt + clicks))
          );
        }
      } else {
        localStorage.setItem(
          'highSc',
          Math.round((pt * pt * 100) / (pt + clicks))
        );
      }
    }
    setStart(false);
  };
  const incrementPt = (amount) => {
    pt = pt + amount;
  };
  const incrementClick = (amount) => {
    clicks = clicks + amount;
  };
  const showInfo = () => {
    if (infoClass === '') {
      setScoreClass('');
      setInfoClass('intro--show');
    } else {
      setInfoClass('');
    }
  };
  const showScore = () => {
    if (scoreClass === '') {
      setInfoClass('');
      setScoreClass('score--show');
    } else {
      setScoreClass('');
    }
  };

  return (
    <div className='App'>
      {start ? (
        <Points
          gameEnd={gameEnd}
          start={start}
          incrementPt={incrementPt}
          incrementClick={incrementClick}
        />
      ) : (
        <div className='ctn'>
          {count ? null : (
            <div>
              <button onClick={showInfo} className='info-btn'>
                <i class='fas fa-info'></i>
              </button>
              <button className='start-btn' onClick={onStart}>
                Start
              </button>
              <button onClick={showScore} className='score-btn'>
                <i class='fas fa-star'></i>
              </button>
              <div className={'intro ' + infoClass}>
                Try and hit as many bubbles in a 30sec period. The bubbles will
                appear large and gradually get smaller. You will get 100 points
                for each bubble hit. Your total score will be multiplied by your
                accuracy rate, so don't spam click.
              </div>
              {localStorage.getItem('pt') > 0 && !count ? (
                <div className={'score ' + scoreClass}>
                  <div>Most recent result</div>
                  <div>Hits - {localStorage.getItem('pt')}</div>
                  <div>
                    Accuracy - {localStorage.getItem('acc')}
                    {'%'}
                  </div>
                  <div>Points - {localStorage.getItem('points')}</div>
                  <div>High Score - {localStorage.getItem('highSc')}</div>
                  {localStorage.getItem('points') ===
                  localStorage.getItem('highSc') ? (
                    <div>NEW HIGH SCORE!!!</div>
                  ) : null}
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
      {count ? (
        <div>
          Get ready
          <Count time={3} callback={countComplete} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
