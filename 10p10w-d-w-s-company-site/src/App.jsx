import React, { useRef } from 'react';
import { render } from 'react-dom';
import './App.scss';

import Tabs from './components/Tabs';

function App() {
  const scrollToRef = ref =>
    window.scrollTo({
      top: ref.current.offsetTop - 90,
      left: 0,
      behavior: 'smooth'
    });
  const contactRef = useRef(null);
  const featureRef = useRef(null);
  const testimonialRef = useRef(null);
  const scrollToFeatureRef = () => scrollToRef(featureRef);
  const scrollToTestimonialRef = () => scrollToRef(testimonialRef);
  const scrollToContactRef = () => scrollToRef(contactRef);

  return (
    <div>
      <div className='tabs'>
        <div className='side-tabs'>
          <div className='logo'>
            <img src={require('./logo.png')} />
          </div>
          <ol className='tabs-list'>
            <li onClick={scrollToFeatureRef}>What we do</li>
            <li onClick={scrollToTestimonialRef}>Testimonials</li>
            <li onClick={scrollToContactRef}>Contact Us</li>
          </ol>
        </div>
      </div>
      <div className='body'>
        <section id='hero-section' className='hero-section'>
          <h1>Door and Window Solutions</h1>
          <p className='sub-heading'>
            Auckland's professional door, window, and lock specialist.
          </p>
        </section>
        <section
          ref={contactRef}
          id='contact-section'
          className='contact-section'
        >
          <div className='contact-text-ctn'>
            <h2 className='contact-heading'>Contact Us</h2>
            <small>Got questions or need a quote? Get in touch.</small>
            <p>0800 83 83 83</p>
            <p>someone@example.com</p>
          </div>
        </section>
        <section
          ref={featureRef}
          id='feature-section'
          className='feature-section'
        >
          <h2 className='feature-heading'>What we do</h2>
          <div className='feature-list-ctn'>
            <ul className='feature-list'>
              <li>
                <div className='icon-circle'>
                  <i class='fas fa-thumbs-up'></i>
                </div>
                Quality Products & Services
              </li>
              <li>
                <div className='icon-circle'>
                  <i class='fas fa-tools'></i>
                </div>
                Window Repairs
              </li>
              <li>
                <div className='icon-circle'>
                  <i class='fas fa-window-maximize'></i>
                </div>
                Window Installation
              </li>
            </ul>
            <ul className='feature-list'>
              <li>
                <div className='icon-circle'>
                  <i class='fas fa-door-open'></i>
                </div>
                Door Replacements
              </li>
              <li>
                <div className='icon-circle'>
                  <i class='fas fa-unlock'></i>
                </div>
                Lock Opening
              </li>
              <li>
                <div className='icon-circle'>
                  <i class='fas fa-key'></i>
                </div>
                Lock Changing
              </li>
            </ul>
          </div>
        </section>
        <section
          ref={testimonialRef}
          id='testimonial-section'
          className='testimonial-section'
        >
          <h2>What Customers Say</h2>
          <div className='testimonial-ctn'>
            <p className='testimonial-quote'>
              Curabitur mollis bibendum luctus. Duis suscipit vitae dui sed
              suscipit. Vestibulum auctor nunc vitae diam eleifend, in maximus
              metus sollicitudin. Quisque vitae sodales lectus.
            </p>
            <p className='testimonial-person'>- Bill, Auckland</p>
          </div>
          <div className='testimonial-ctn'>
            <p className='testimonial-quote'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              mauris arcu, lobortis id interdum vitae, interdum eget elit.
            </p>
            <p className='testimonial-person'>- Jeff, Wellington</p>
          </div>
        </section>
        <section id='footer-section' className='footer-section'>
          <h3>Get a free no obligation quote now!</h3>
          <p>0800 83 83 83</p>
          <p>someone@example.com</p>
        </section>
      </div>
    </div>
  );
}

// const container = document.createElement('div');
// document.body.appendChild(container);

export default App;
