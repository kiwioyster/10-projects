import React from 'react';
import Cardster from '../components/Cardster';

function QuizCardster(props) {
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [animating, setAnimating] = React.useState(false);
  const cards = props.cards || [];
  const getRandCardIndex = length => {
    return Math.floor(Math.random() * length);
  };
  const [card, setCard] = React.useState(cards[getRandCardIndex(cards.length)]);
  const pickNextCard = () => {
    setTimeout(() => {
      setCard(cards[getRandCardIndex(cards.length)]);
    }, 200);
  };
  const cardClick = () => {
    if (!animating) {
      setAnimating(true);
      if (showAnswer) {
        pickNextCard();
      }
      setShowAnswer(!showAnswer);
      setTimeout(() => {
        setAnimating(false);
      }, 600);
    }
  };

  const getCard = () => {
    if (card) {
      return (
        <Cardster cardClick={cardClick} flipped={showAnswer}>
          <div className='flip-card-inner'>
            <div className='flip-card-front'>{card.question}</div>
            <div className='flip-card-back'>{card.answer}</div>
          </div>
        </Cardster>
      );
    } else {
      return 'No Cards...';
    }
  };
  return <div className='QuizCardster'>{getCard()}</div>;
}

export default QuizCardster;
