import React, { useReducer } from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import NavBar from './components/navbar';

// import pages for routes;
import HomePage from './pages/homePage';
import AppPage from './pages/appPage';

// import context object
import { GeneralContext } from './state/contexts';
import { initialGeneralState, generalReducer } from './state/reducers';

const App = () => {

  const [generalState, generalDispatch] = useReducer(generalReducer, initialGeneralState);

  return (
    <GeneralContext.Provider
      value={{
        generalState,
        generalDispatch
      }}>
      <Router>
        <div id='appHeader'>
          <Link to="/"
            onClick={() => {
              generalDispatch({ type: 'ON_HOME_PAGE' })
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
          <NavBar />
        </div>

        <Switch>
          <Route path='/app' render={() => (
            <AppPage />)}
          />
          <Route path='/' exact component={HomePage} />
        </Switch>
      </Router>
    </GeneralContext.Provider>
  )
};

export default App;