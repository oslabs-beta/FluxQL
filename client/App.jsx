import React, { useReducer, lazy, Suspense } from 'react';
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

  return (
    <GeneralContext.Provider
      value={{
        generalState,
        generalDispatch
      }}>
      
      <div id='appHeader'>
        <Link to='/'>
          <img
            className='logo'
            id='logo'
            src='./assets/bannericon.png'
            alt='DraQLa Logo'
            height='75px'
            width='75px'
          ></img>
          <img
            id='logotext'
            src='./assets/logotext.png'
            alt='DraQLa Text'
            height='65px'
            width='150px'
          ></img>

        </Link>
        <NavBar location={location.pathname}/>
      </div>

      <Suspense fallback={<div>YOOOO</div>}>
        <Switch>
          <Route path='/app' component={AppPage} />
          <Route exact path='/' component={HomePage} />
        </Switch>
      </Suspense>
      
    </GeneralContext.Provider>
  );
};

export default App;
