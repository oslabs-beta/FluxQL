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
        <div id='homeTitle'>

        </div>
        <DemoContainer />
        <h1 id='teamHeader'>DraQLabs Developers</h1>
        <div className = 'teamPage'>
          <TeamContainer />
        </div>
      </HomeContext.Provider>
    </div>
  );
}