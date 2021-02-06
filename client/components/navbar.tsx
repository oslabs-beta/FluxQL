import React from 'react'
import { Link } from 'react-router-dom';


export default function navbar({ onHomePage, handleHomeBtn, handlePlayBtn, handleURIModal, showURIModal }) {

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

        <a href='#' className='link' onClick={() => {

          
          // add blur to App Page Container if it exists
          const fullAppPage = document.getElementById('AppPage');
          
          if (!showURIModal){
            fullAppPage.style.filter = 'blur(1.5px)';
          } else {
            fullAppPage.style.filter = 'none';
          }
          
          // toggle state to pop up the modal
          handleURIModal()

          }}>
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