import React, { useContext, lazy, useReducer, useEffect } from 'react';
import { HomeContext } from '../state/contexts';
import { initialHomeState, homeReducer } from '../state/reducers';
const DemoContainer = lazy(()=> import('../containers/demoContainer'));
const TeamContainer = lazy(()=> import('../containers/teamContainer'));


export default function homePage() {

  const [homeState, homeDispatch] = useReducer(homeReducer, initialHomeState);

  return (
    <div className= 'homePage'>
      <HomeContext.Provider value={{
        homeState,
        homeDispatch
      }}>
        <div className='starWrapper'>
          <div id='stars'></div>
          <div id='stars2'></div>
          <div id='stars3'></div>
          <div id='homeTitle'>
            <img src='../assets/logoclear.png' width='300px' height='300px'></img>
            <span>DraQLa</span>
          </div>
          <DemoContainer />
          <h1 id='teamHeader'>DraQLabs Developers</h1>
          <div className = 'teamPage'>
            <TeamContainer />
          </div>
        </div>
      </HomeContext.Provider>
    </div>
  );
}