import React from 'react';
import Cardster from '../components/Cardster';

function AllCardster(props) {
  const [state, setState] = React.useState({ cards: props.cards });

  const deleteCard = i => {
    state.cards.splice(i, 1);
    setState({ cards: state.cards });
  };

  const getAllCards = () => {
    if (state.cards.length > 0) {
      return state.cards.map((card, i) => {
        const q = `Q: ${card.question}`;
        const a = `A: ${card.answer}`;
        return (
          <Cardster key={i}>
            <div className='flip-card-inner'>
              <p className='all-card-text'>{q}</p>
              <p className='all-card-text'>{a}</p>
              <div className='delete-btn' onClick={() => deleteCard(i)}>
              <i class="far fa-trash-alt"></i>
              </div>
            </div>
          </Cardster>
        );
      });
    } else {
      return 'No Cards..';
    }
  };
  return <div className='AllCardster'>{getAllCards()}</div>;
}

export default AllCardster;
