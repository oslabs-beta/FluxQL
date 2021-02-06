import React from 'react'
import { Link } from 'react-router-dom';


export default function navbar() {


  /*
  ! for NavBar
  if (onHomePage){
  }
  */



  return (
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

      <Link to="/app" className='link'>
        Play
      </Link>
    </div>
  )
};




/*
! for NavBar when we're in AppPage
<Link to="/" className='link'> 
  Home
</Link>
*/