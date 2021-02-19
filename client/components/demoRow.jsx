import React from 'react';

export default function demoRow ({ index, gif, text, header }) {
  if (!(index % 2)) {
    return (
      <div className = 'demoRow'>
        <img src = {gif} className = 'demoImage' alt = 'EVEN'/>
        <div className = 'demoDescription'>
          <h1 className='demoHeader'>{header}</h1>
          <h3 className = 'demoText'>{text}</h3>
        </div>
      </div>
    );
  } else {
    return (
      <div className = 'demoRow'>
        <div className = 'demoDescription' >
          <h1 className='demoHeader'>{header}</h1>
          <h3 className = 'demoText'>{text}</h3>
        </div>
        <img src = {gif} className = 'demoImage' alt = 'ODD'/>
      </div>
    );
  }
}