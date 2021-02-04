import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
// import NavBar

// import pages for routes;
import HomePage from './pages/homePage';
import AppPage from './pages/appPage';
import ErrorPage from './pages/errorPage';

const App = () => {
  console.log('hi from App.tsx');

  /* 
  !things to do for appHeader:
  - import logo -> change line 26-30 to an image tag with DraQLa Logo
  - import NavBar

  - also create a react router for No Match 404 error
  */

  return (
    <>
      <Router>
        <div className='appHeader'> 
          <Link to="/"> 
              <button type="button">
                HOME PAGE
              </button>
          </Link>

          {/* NavBar */}
          <Link to="/app">
              <button type="button">
                APP PAGE
              </button>
          </Link>
        </div>

        <Switch>
          <Route path='/app' component={AppPage} />
          <Route path='/' exact component={HomePage}/>
        </Switch>
      </Router>
    </>
  )
};

export default App;
