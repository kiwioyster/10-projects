import React from 'react';
import { render } from 'react-dom';
import './App.scss';

import Tabs from './components/Tabs';
import IntroPage from './components/pages/IntroPage';
import AboutPage from './components/pages/AboutPage';
import ProjPage from './components/pages/ProjPage';
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
        <div label='About Me'>
          <AboutPage />
        </div>
        <div label='Projects'>
          <ProjPage />
        </div>
      </Tabs>
      <ToastContainer />
    </div>
  );
}

// const container = document.createElement('div');
// document.body.appendChild(container);

export default App;
