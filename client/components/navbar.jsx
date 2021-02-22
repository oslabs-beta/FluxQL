import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// import the custom useContext
import { useGenContext } from '../state/contexts';

//export default function navbar({ history }) {
export default function navbar() {
  // we invoke the custom useContext
  const { generalState, generalDispatch } = useGenContext();

  let navbarDisplay;

  // this should be context){ // onHomePage => true or false
  if (generalState.onHomePage) {
    navbarDisplay = (
      <div className="NavBarContainer">
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
           // history.pushState('/app', '');
            //console.log(history);
            generalDispatch({ type: 'NOT_HOME_PAGE' });

            // to make the modal pop up after we reach the play page
            setTimeout(generalDispatch({ type: 'OPEN_URI_MODAL' }), 1000);
          }}
        >
          Play
        </Link>
      </div>
    );
  } else {
    navbarDisplay = (
      <div className="NavBarContainer">
        <Link
          to="/"
          className="link"
          onClick={() => {
            generalDispatch({ type: 'ON_HOME_PAGE' });
            //history.pushState('/', '');
          }}
        >
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
      </div>
    );
  }

  return navbarDisplay;
}
