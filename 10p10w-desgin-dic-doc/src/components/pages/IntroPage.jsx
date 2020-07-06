import React from 'react';

function IntroPage() {
  return (
    <div>
      <h2>Getting Started</h2>
      <p className='descriptor-paragraph'>
        Design tokens are the visual design atoms of the design system —
        specifically, they are named entities that store visual design
        attributes. We use them in place of hard-coded values (such as hex
        values for color or pixel values for spacing) in order to maintain a
        scalable and consistent visual system for UI development.
        <br />
        <br />
        Our core belief is that the products we design should work across
        anything that can access the web. Whether it’s a laptop, a smartphone, a
        watch, or even a browser integrated into a car’s dashboard.
        <br />
        <br />
        This is a showcase of how design tokens can be defined in a single
        source of truth and reproduced across multiple platforms.
      </p>
    </div>
  );
}

export default IntroPage;
