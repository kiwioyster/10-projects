import React from 'react';
import './ProjPage.scss';
import projects from '../../projects.json';
import { copyToClipboard } from '../../util/util';

function ProjPage() {
  const tenWeekProj = projects['10p10w'];
  const androidProj = projects.android;
  return (
    <div className='page-content'>
      <h2>10 Sites in 10 Weeks</h2>
      <p>
        10 Sites in 10 weeks was a project/challenge that I took on in early
        2020. It was influenced by the{' '}
        <a
          target='_blank'
          href='https://www.freecodecamp.org/news/how-i-built-100-projects-in-100-days/'
        >
          100 Projects in 100 Days
        </a>
        . Building 100 projects in 100 days was very impressive so I wanted to
        try but I knew I didn't have the determination to do it for 100 days, so
        I settled with 10 weeks. I also wanted the projects to be a bit bigger
        and complex so I gave myself 1 week to do them.
        <br />
        <br />
        It was definitely a worthwhile experience. I faced many challenges, too
        many to list in fact. The biggest was on my 6th week when the whole
        country went into lockdown due to COVID-19 so I had to work from home,
        often overtime and on weekends. I was left with little to no time for
        this project.
        <br />
        <br />
        Below you can find all 9 projects that I completed. The 10th project is
        this site that you are on right now 😜.
      </p>
      <div className='proj-grid'>
        {Object.entries(tenWeekProj).map((p) => {
          return (
            <a target='_blank' href={p[1].url} className='proj-card'>
              <div className='proj-card__inner'>
                <img src={p[1].iconUrl} className='proj-card__img'></img>
                <div className='proj-card__text'>
                  <p className='proj-card__name'>{p[1].name}</p>
                  <p className='proj-card__desc'>{p[1].description}</p>
                </div>
              </div>
            </a>
          );
        })}
        {/* Android Apps
        {Object.entries(androidProj).map(
          ([name, iconUrl, url, description]) => {
            return (
              <a href={url} className='font-card'>
                <div className='font-card__value'>{iconUrl}</div>
                <div className='font-card__text'>
                  <p>{name}</p>
                  <p className='copy-pill'>{description}</p>
                </div>
              </a>
            );
          }
        )} */}
      </div>
    </div>
  );
}

export default ProjPage;
