import React, { useContext, lazy, useReducer, useEffect } from 'react';
import { HomeContext } from '../state/contexts';
import { initialHomeState, homeReducer } from '../state/reducers';

const SplashContainer = lazy(()=> import('../containers/splashContainer'));
const AboutContainer = lazy(()=> import('../containers/aboutContainer'));
const DemoContainer = lazy(()=> import('../containers/demoContainer'));
const FeatureContainer = lazy(()=> import('../containers/featureContainer'));
const ContactContainer = lazy(()=> import('../containers/contactContainer'));
const TeamContainer = lazy(()=> import('../containers/teamContainer'));


export default function homePage() {
  if (window.location.pathname === '/') {
    document.querySelector('#NavBarContainer').style.position = 'fixed';
  } else if (window.location.pathname === 'app') {
    document.querySelector('#NavBarContainer').style.position = 'static';
  }
  const [homeState, homeDispatch] = useReducer(homeReducer, initialHomeState);

  return (
    <div className= 'homePage'>
      <HomeContext.Provider value={{
        homeState,
        homeDispatch
      }}>
        <div className='starWrapper'>
          <SplashContainer />
          <AboutContainer />
          <DemoContainer />
          <FeatureContainer />
          <ContactContainer />
          <h1 id='teamHeader'>DraQLabs Developers</h1>
          <div className = 'teamPage'>
            <TeamContainer />
          </div>
        </div>
      </HomeContext.Provider>
    </div>
  );
}