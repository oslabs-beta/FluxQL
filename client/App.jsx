import React, { useReducer } from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
//import { createBrowserHistory } from 'history';
import NavBar from './components/navbar';

// import pages for routes;
import HomePage from './pages/homePage';
import AppPage from './pages/appPage';

// import context object
import { GeneralContext } from './state/contexts';
import { initialGeneralState, generalReducer } from './state/reducers';


const App = () => {
  //const customHistory = useHistory();
  
  const [generalState, generalDispatch] = useReducer(generalReducer, initialGeneralState);

  return (
    <GeneralContext.Provider
      value={{
        generalState,
        generalDispatch
      }}>
      
      <div id='appHeader'>
        <Link to="/"
          onClick={() => {
            generalDispatch({ type: 'ON_HOME_PAGE' });
            //history.pushState('/', '');
          }}
        >
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
        {/*<NavBar history={history}/>*/}
        <NavBar />
      </div>

      {/*<Switch history={customHistory}>*/}
      <Switch>
        <Route path='/app' render={() => (
          <AppPage />)}
        />
        <Route path='/' exact component={HomePage} />
      </Switch>
      
    </GeneralContext.Provider>
  );
};

export default App;