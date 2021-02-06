import React from 'react'
import { Link } from 'react-router-dom';


export default function navbar({ onHomePage, handleHomeBtn, handlePlayBtn, handleModal }) {

  let navbarDisplay;
  
  if (onHomePage){
    navbarDisplay = 
      <div className='NavBarContainer'>
        <a href='#' className='link'>
          About
        </a>
        <a href='#' className='link'>
          Team
        </a>
        <a href='https://github.com/oslabs-beta/DraQLa' target="_blank" className='link'>
          GitHub
        </a>
        <Link to='/app' className='link' onClick={handlePlayBtn}>
          Play
        </Link>
      </div>
  } else {
    navbarDisplay = 
      <div className='NavBarContainer'>

        <Link to="/" className='link' onClick={handleHomeBtn}> 
          Home
        </Link>

        <a href='#' className='link' onClick={handleModal}>
          DB URI
        </a>

        <a href='#' className='link' onClick={() => {alert('hi')}}>
          Playground
        </a>

      </div>
  };

  return navbarDisplay;
};




/*
! for NavBar when we're in AppPage
<Link to="/" className='link'> 
  Home
</Link>
*/