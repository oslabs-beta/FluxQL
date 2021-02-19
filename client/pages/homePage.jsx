import React from 'react'
import TeamContainer from '../containers/teamContainer';
import DemoContainer from '../containers/demoContainer';


export default function homePage() {

  return (
    <div className= 'homePage'>
      <DemoContainer />
      <h1 id='teamHeader'>Team Members</h1>
      <div className = 'teamPage'>
        <TeamContainer />
      </div>
    </div>
  );
}