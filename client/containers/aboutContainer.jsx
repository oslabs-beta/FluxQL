import React from 'react';

export default function aboutContainer() {
  return (
    <div id='aboutFlex'>
      <div className='aboutFlexItem'>
        <h3>Your Story</h3>
        <p>You are seeking an upgrade from your REST API framework to GraphQL but the evolution seems daunting.</p>
      </div>
      <div className='aboutFlexItem'>
        <h3>Our Vision</h3>
        <p>DraQLA is a GraphQL migration assistance tool that empowers developers to build GraphQL schemas, without writing any code.</p>
      </div>
      <div className='aboutFlexItem'>
        <h3>Features</h3>
        <p>
          GENERATE <br></br><br></br>
          ADVISE <br></br><br></br>
          TEST <br></br><br></br>
          PLAY <br></br><br></br>
        </p>
      </div>
    </div>
  );
}
