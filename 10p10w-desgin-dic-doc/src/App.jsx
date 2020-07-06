import React from 'react';
import { render } from 'react-dom';
import './App.scss';

import Tabs from './components/Tabs';
import IntroPage from './components/pages/IntroPage';
import ColorsPage from './components/pages/ColorsPage';
import FontsPage from './components/pages/FontsPage';
import SpacingsPage from './components/pages/SpacingsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Tabs>
        <div label='Intro'>
          <IntroPage />
        </div>
        <div label='Colors'>
          <ColorsPage />
        </div>
        <div label='Fonts'>
          <FontsPage />
        </div>
        <div label='Spacing'>
          <SpacingsPage />
        </div>
      </Tabs>
      <ToastContainer />
    </div>
  );
}

// const container = document.createElement('div');
// document.body.appendChild(container);

export default App;
