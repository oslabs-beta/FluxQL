import React from 'react'
import TeamContainer from '../containers/teamContainer';


export default function homePage() {

  return (
    <div className= 'homePage'>
      <h1>Demo & Description</h1>
      <h1>Team Members</h1>
      <div className = 'teamPage'>
        <TeamContainer />
      </div>
    </div>
  )
};