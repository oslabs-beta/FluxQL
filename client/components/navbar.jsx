import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import the custom useContext
import { useGenContext } from '../state/contexts';

export default function navbar({ location }) {
  // we invoke the custom useContext
  const { generalDispatch } = useGenContext();

  let navbarDisplay;

  if (location === '/'){
    navbarDisplay = (
      <>
        <a href="#" className="link">
          About
        </a>
        <a href="#" className="link">
          Team
        </a>
        <a
          href="https://github.com/oslabs-beta/DraQLa"
          target="_blank"
          className="link"
        >
          GitHub
        </a>
        <Link
          to="/app"
          className="link"
          onClick={() => {
            setTimeout(generalDispatch({ type: 'OPEN_URI_MODAL' }), 1000);
          }}
        >
          Play
        </Link>
      </>
    );
  } else if (location === '/app'){
    navbarDisplay = (
      <>
        <Link
          to="/"
          className="link">
          Home
        </Link>

        <a
          href="#"
          className="link"
          onClick={() => {
            // toggle state to pop up the modal
            generalDispatch({ type: 'OPEN_URI_MODAL' });
          }}
        >
          DB URI
        </a>

        <a
          href="#"
          className="link"
          onClick={() => {
            window.open('/graphql', '_blank');
          }}
        >
          Playground
        </a>
      </>
    );
  }

  return (
    <div className="NavBarContainer">
      {navbarDisplay}
    </div>
  );
}