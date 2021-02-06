import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import NavBar from './components/navbar';

// import pages for routes;
import HomePage from './pages/homePage';
import AppPage from './pages/appPage';
import ErrorPage from './pages/errorPage';

const App = () => {
  const [onHomePage, setOnHomePage] = useState(true);
  
  

  /* 
  !things to do for appHeader:
  - NavBar: pass down onHomePage and event handler to toggle state
  - also create a react router for No Match 404 error
  */

  return (
    <>
      <Router>
        <div className='appHeader'> 
          <Link to="/"> 
              <img
                className="logo"
                id="logo"
                src="https://res.cloudinary.com/mrtommyliang/image/upload/v1612572081/bannericon_ld8ofl.png"
                alt="DraQLa Logo"
                height='75px'
                width='75px'
              ></img>
            </Link>       
          <NavBar />
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
