import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import NavBar from './components/navbar';

// import pages for routes;
import HomePage from './pages/homePage';
import AppPage from './pages/appPage';

const App = () => {
  const [onHomePage, setOnHomePage] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const handleHomeBtn = () => {
    setOnHomePage(true);
    console.log('handleHome');
    
  }

  const handlePlayBtn = () => {
    setOnHomePage(false)
    console.log('handlePlay');
  }
  
  const handleModal = () => {
    setShowModal(!showModal)
    console.log('handleModal');
  }

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
                src="./assets/bannericon.png"
                alt="DraQLa Logo"
                height='75px'
                width='75px'
              ></img>
            </Link>       
          <NavBar 
            onHomePage={onHomePage}
            handleHomeBtn={handleHomeBtn}
            handlePlayBtn={handlePlayBtn}
            handleModal={handleModal}
            />
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
