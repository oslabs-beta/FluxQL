import React, { useContext, lazy, useReducer } from 'react';
import { HomeContext } from '../state/contexts';
import { initialHomeState, homeReducer } from '../state/reducers';

const SplashContainer = lazy(()=> import('../containers/splashContainer'));
const AboutContainer = lazy(()=> import('../containers/aboutContainer'));
const DemoContainer = lazy(()=> import('../containers/demoContainer'));
const FeatureContainer = lazy(()=> import('../containers/featureContainer'));
const TeamContainer = lazy(()=> import('../containers/teamContainer'));
const ContactContainer = lazy(()=> import('../containers/contactContainer'));
const FooterContainer = lazy(()=> import('../containers/footerContainer'));


export default function homePage() {
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
          <img id='teamHeader' src='../assets/teamdraqlabs.png'></img>
          <div className = 'teamPage'>
            <TeamContainer />
          </div>
          <ContactContainer />
        </div>
      </HomeContext.Provider>
      <FooterContainer />
    </div>
  );
}