import React from 'react';
import { useState } from 'react';

function Results(props) {
  const propsOnClick = props.update;
  const [income, setIncome] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [resultClass, setResultClass] = React.useState('result__country');
  const [flavorClass, setFlavorClass] = React.useState('result__flavor');
  const onClick = () => {
    setFlavorClass('result__flavor');
    propsOnClick();
    if (country !== null && country !== '') {
      if (resultClass === 'result__country result__country--reanimate') {
        setResultClass('result__country result__country--reanimate-2');
      } else {
        setResultClass('result__country result__country--reanimate');
      }
    }
  };
  const countryClick = () => {
    setFlavorClass('result__flavor result__flavor--open');
  };
  React.useEffect(() => {
    setTimeout(() => {
      setCountry(props.country);
      setIncome(_getIncomeFlavorTxt(props.income, props.country));
    }, 600);
  }, [props.country, props.income]);
  const _getIncomeFlavorTxt = (income, country) => {
    const rand = Math.random() * 100;
    let txt;
    switch (income.toLowerCase()) {
      case 'high income':
        // 1% very high class
        if (rand < 1) {
          txt = `${country} is a high income country. The majority of your countrymen are likely upper middle class. You have been lucky enough to not only be born in ${country} but also be born to a top upper class family. Your parents hold very respectable and high earning jobs and you will live a very comfortable life with many opportunities. You are essentially born with a silver spoon in your mouth.`;
        }
        // 14% high class
        else if (rand < 15) {
          txt = `${country} is a high income country. The majority of your countrymen are likely upper middle class. You have been lucky enough to not only be born in ${country} but also be born to an upper class family. Your family will likely never worry about money and you will live an easy life with education and healthcare sorted for you.`;
        }
        // 55% middle class
        else if (rand < 70) {
          txt = `${country} is a high income country. You have been lucky enough be born in ${country} to a middle class family. Your parents are not rich but they make enough to get by. You will never have to worry about food. You will have many opportunities for you in life if you work hard to get it.`;
        }
        // 30% lower class
        else {
          txt = `${country} is a high income country. You have been lucky enough be born in ${country}. However you were born to a lower class family. Your parents are not in a happy marriage. Your mother is currently unemployed. However she will always put you first and make sure your stomach is full. Drug problems are also common around where you live. Although these aren't the best circumstances, you can still go to school and get an education. With enough hard work you can break out into the middle class easily.`;
        }
        break;
      case 'upper middle income':
        // 0.5% very high class
        if (rand < 0.5) {
          txt = `${country} is a upper middle income country. The majority of your countrymen are likely poor or lower middle class. However you have been very lucky to be born to an aristocratic family in ${country}. Your parents hold very respectable and high earning positions. All your friends also live very comfortably. Your parents will most likely send you overseas to a first world country for education. As long as you don't lose sight of whats important, you will live a very comfortable life.`;
        }
        // 4.5% high class
        else if (rand < 5) {
          txt = `${country} is a upper middle income country. The majority of your countrymen are likely poor or lower middle class. You have been very lucky to be born to an upper class family in ${country}. Your family will likely never worry about money and you will live an easy life. It's very likely your parents will emigrate to a first world country or send you overseas for education. As long as you don't lose sight of whats important, you will live a very comfortable life.`;
        }
        // 35% middle class
        else if (rand < 40) {
          txt = `${country} is a upper middle income country. You have been born to middle class family in ${country}. Your parents are not rich but they make enough to get by. You probably don't have to worry about food, healthcare or education. If your parents save enough money you will probably emigrate overseas to a first world country or they will send you overseas for education. Your life won't be a walk in the park but you also have many opportunities if you work hard.`;
        }
        // 60% lower class
        else {
          txt = `${country} is a upper middle income country. Unfortunately you have been born to lower class family in ${country}. Your parents are poor laborers and barely make enough to get by. However they will always make sure you have enough food. But sometimes your family will have to skip meals. Your parents will try their best to get you an education but it's not enough to get you a job overseas for a better life.`;
        }
        break;
      case 'lower middle income':
        // 1% high class
        if (rand < 1) {
          txt = `${country} is a lower middle income country. The majority of your countrymen are poor laborers and farmers. You have been very lucky to be born to an upper class family in ${country}. Your parents hold very respectable and high earning positions and live in a nice house. You will never need to worry about food, healthcare of education. Your parents might also emigrate overseas to a first world country or send you overseas for an education. As long as you don't lose sight of whats important, you will live a very comfortable life.`;
        }
        // 20% middle class
        else if (rand < 21) {
          txt = `${country} is a lower middle income country. The majority of your countrymen are poor laborers and farmers. Luckily you have been born to a middle class family in ${country}. Your family isn't rich but earn enough to get by. You will never know what starvation feels like and will get a decent education. If your parents save up enough money they might emigrate overseas to a first world country or send you overseas for education. Your life won't be a walk in the park. You will have to work very hard and get lucky to achieve a comfortable life.`;
        }
        // 77.5% lower class
        else if (rand < 90) {
          txt = `${country} is a lower middle income country. Unfortunately you have been born to lower class family in ${country}. Your parents are poor farmers and barely make enough to get by. It is common for you to skip meals. You do not have the luxury of televisions or internet. If you're lucky you will get a decent education growing up. But it's also likely you will grow up illiterate. Without a lot of luck and hard work you will most likely be stuck like this for your entire life. Your children and grandchildren will most likely suffer the safe fate.`;
        } else {
          txt = `${country} is a lower middle income country. Unfortunately you were born to a poor family and you died at child birth.`;
        }
        break;
      case 'low income':
        // 0.1% high class
        if (rand < 0.1) {
          txt = `${country} is a low income country. The majority of your countrymen live in extreme poverty and live rurally. However you are very lucky to be born the one of the top aristocratic family in the country. Your parents hold very respectable and high earning positions and live in a nice house. You will never need to worry about food, healthcare of education. Your parents will probably send you overseas for an education. As long as you don't lose sight of whats important, you will live a very comfortable life.`;
        }
        // 5% middle class
        else if (rand < 5.5) {
          txt = `${country} is a low income country. The majority of your countrymen live in extreme poverty and live rurally. However you are lucky enough to be born to a middle class family. Your parents aren't rich. But you have a roof over your head and have food on the table. There aren't many opportunities for you but you will get an education. It is unlikely your parents will save enough money to get you better education. So if you want a better life you'd need a lot of hard work and a lot of luck.`;
        }
        // 94.5% lower class
        else if (rand < 75) {
          txt = `${country} is a low income country. Unfortunately you have been born to lower class family in ${country}. Your family have no money or roof over their head. You will never know the feeling of a full stomach. There are no doctors when you get sick. You have a very good chance of dying of disease before your 3rd birthday. If you do survive to adulthood you will most likely be illiterate. Without a lot of luck and hard work you will most likely be stuck like this for your entire life. Your children and grandchildren will most likely suffer the safe fate.`;
        } else {
          txt = `${country} is a low income country. Unfortunately you were born to a poor family and you died at child birth.`;
        }
        break;
    }
    return txt;
  };
  return (
    <div className='Results'>
      <div className='loading'>
        <div className='loading__text'>Finding a mother for you...</div>
        <div className='loader'></div>
      </div>
      <div className='prelude'>
        <div className='prelude__first'>⦿ Mother found</div>
        <div className='prelude__second'>⦿ Country located</div>
        <div className='prelude__third'>⦿ Loading info...</div>
      </div>
      <div className='result'>
        <div className='result__intro'>You're born in...</div>
        <div
          className={'result__clickable ' + resultClass}
          onClick={countryClick}
        >
          {country}
        </div>
        <div className={flavorClass + ' ' + resultClass}>{income}</div>
        <button className='again-btn' onClick={onClick}>
          Try again
        </button>
      </div>
    </div>
  );
}

export default Results;
