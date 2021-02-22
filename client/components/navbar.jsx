import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import the custom useContext
import { useGenContext } from '../state/contexts';

export default function Navbar({ history }) {  
//export default function navbar() {
  // we invoke the custom useContext
  const { generalState, generalDispatch } = useGenContext();
  console.log('generalState:', generalState);

  console.log('sessionStorage./app: ', sessionStorage['/app']);
  console.log('sessionStorage.refresh: ', sessionStorage.refresh);
  

  let navbarDisplay;

  if (generalState.onHomePage){
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
            // //history.push('/app');
            // //console.log('history from pushing PlayBtn: ', history);
            // sessionStorage.setItem('/app', true);
            // sessionStorage.setItem('refresh', false);

            generalDispatch({ type: 'NOT_HOME_PAGE' });

            // to make the modal pop up after we reach the play page
            setTimeout(generalDispatch({ type: 'OPEN_URI_MODAL' }), 1000);
          }}
        >
          Play
        </Link>
      </>
    );
  } else {
    navbarDisplay = (
      <>
        <Link
          to="/"
          className="link"
          onClick={() => {
            delete sessionStorage['/app'];
            generalDispatch({ type: 'ON_HOME_PAGE' });
            //history.push('/');
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
      </>
    );
  }

  // if user refreshed the page on /app, change GeneralState to display the App page NavBar and pop up the modal
  // useEffect(() => {

  //   if (sessionStorage['/app']) {
  //     generalDispatch({ type: 'NOT_HOME_PAGE' });
  //     setTimeout(generalDispatch({ type: 'OPEN_URI_MODAL' }), 1000);
  //   }
  // });

  return (
    <div className="NavBarContainer">
      {navbarDisplay}
    </div>
  );
}

/*
export default function navbar() {
  // we invoke the custom useContext
  const { generalState, generalDispatch } = useGenContext();
  console.log('generalState:', generalState);
  console.log('generalDispatch :', generalDispatch);

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
           // history.push('/app', '');
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
            //history.push('/', '');
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

*/
