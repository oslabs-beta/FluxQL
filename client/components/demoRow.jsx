import React from 'react';

export default function demoRow ({ index, gif, text }) {
  if (!(index % 2)) {
    return (
      <div className = 'demoRow'>
        <img src = {gif} className = 'demoImage' alt = 'EVEN'/>
        <div className = 'demoDescription'>{text}</div>
      </div>
    );
  } else {
    return (
      <div className = 'demoRow'>
        <div className = 'demoDescription' >{text}</div>
        <img src = {gif} className = 'demoImage' alt = 'ODD'/>
      </div>
    );
  }
}