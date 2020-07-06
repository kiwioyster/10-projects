import React from 'react';

function SideNav() {
  return (
    <nav className='side-nav'>
      <h1>Design System</h1>
      <div className='pill'>v 0.1</div>
      <div className='links-ctn'>
        <a>Intro</a>
        <a>Colors</a>
        <a>Fonts</a>
        <a>Spacing</a>
      </div>
    </nav>
  );
}

export default SideNav;
