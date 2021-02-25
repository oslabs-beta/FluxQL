import React, { useReducer, lazy, Suspense, useEffect } from 'react';
import { Route, Switch, Link, useLocation } from 'react-router-dom';
import NavBar from './components/navbar';

// import pages for routes;
const HomePage = lazy(() => import('./pages/homePage'));
const AppPage = lazy(() => import('./pages/appPage'));

// import context object
import { GeneralContext } from './state/contexts';
import { initialGeneralState, generalReducer } from './state/reducers';


const App = () => {
  // to grab the current URL path
  const location = useLocation();
  
  const [generalState, generalDispatch] = useReducer(generalReducer, initialGeneralState);

  useEffect(() => {
    const nav = document.getElementById('NavBarContainer').style;
    const html = document.querySelector('html').style;
    const appHeader = document.getElementById('appHeader').style;

    if (location.pathname === '/') {
      nav.position = 'fixed';
      appHeader.justifyContent = 'flex-end';
    } else {
      html.background = '$currentline';
      nav.position = '';
      appHeader.justifyContent = 'space-between';
    }
  });

  return (
    <GeneralContext.Provider
      value={{
        generalState,
        generalDispatch
      }}>
      
      <div id='appHeader'>
        {location.pathname === '/app' && <Link to='/'>
          <img
            className='logo'
            id='logo'
            src='./assets/logoclear.png'
            alt='DraQLa Logo'
            height='100px'
            width='100px'
          ></img>
          
        </Link>}
        <NavBar location={location.pathname}/>
      </div>

      <Suspense fallback={<div id='lazy'></div>}>
        <Switch>
          <Route path='/app' component={AppPage} />
          <Route exact path='/' component={HomePage} />
        </Switch>
      </Suspense>
      
    </GeneralContext.Provider>
  );
};

export default App;
