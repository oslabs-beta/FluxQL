import React from 'react';

const medium = 'https://erkrebs.medium.com/thinking-of-migrating-from-rest-to-graphql-9f0e019c4582';

export default function featureContainer() {
  return (
    <div className='featureContainer'>
      <div className='featureTitle'>
        <span>Featured on Medium</span>
        <hr></hr>
      </div>
      <div className='featureQuote'>
        <h1>"DraQLa makes migrating 
          <br></br>
          <i>fang</i>-tastic!"</h1>
      </div>
      <a href={medium} target='_'>
        <img src='../assets/medium.png'></img>
      </a>
    </div>
  );
}
