import React from 'react';
import './App.css';
import AddCardster from './screens/AddCardster';
import QuizCardster from './screens/QuizCardster';
import AllCardster from './screens/AllCardster';
import LoadPresets from './screens/LoadPresets';
import Menu from './components/Menu';
function App() {
  const cards = [];
  const addCards = (question, answer) => {
    cards.push({ question, answer });
  };
  return (
    <div className='App'>
      <Menu>
        <div label='Add Cards'>
          <AddCardster addCards={addCards} />
        </div>
        <div label='Quiz Cards'>
          <QuizCardster cards={cards} />
        </div>
        <div label='All Cards'>
          <AllCardster cards={cards} />
        </div>
        <div label='Load Presets'>
          <LoadPresets addCards={addCards} />
        </div>
      </Menu>
    </div>
  );
}

export default App;
