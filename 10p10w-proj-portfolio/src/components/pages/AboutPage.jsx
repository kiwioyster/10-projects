import React from 'react';
import './AboutPage.scss';
import baseColors from '../../properties/color/base.json';
import { copyToClipboard } from '../../util/util';

function AboutPage() {
  const colors = baseColors.color;

  return (
    <div className='page-content'>
      <h2>About Me</h2>
      <p>
        I'm a one person team and I release my projects under the alias Nohats
        Studio. I make everything from web apps, to mobile apps and video game
        mods. I am based in New Zealand and work as a front-end developer during
        the day.
      </p>
      <h2>Contacts</h2>
      <p>
        You can reach me at{' '}
        <a href={'mailto:nohatsdev@gmail.com'} target='_top'>
          nohatsdev@gmail.com
        </a>
      </p>
    </div>
  );
}

export default AboutPage;
