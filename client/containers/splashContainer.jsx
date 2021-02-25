import React from 'react';
import { Link } from 'react-router-dom';
import { useGenContext } from '../state/contexts';

export default function splashContainer() {
  const { generalDispatch } = useGenContext();

  return (
    <>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
      <div id='homeTitle'>
        <Link to='/app' onClick={() =>{
          setTimeout(generalDispatch({ type: 'OPEN_URI_MODAL' }), 1000);
        }}>
          <img src='../assets/logoclear.png' width='300px' height='300px' id='homelogo'></img>
        </Link>
          {/* <span>Dra<span id='QL'>QL</span>a</span> */}
          <img id='homelogotext' src='../assets/logotext.png'></img>
      </div>
      <section id="scrollDown" className="pointerDown">
        <a id="scrollDownLink"href="#about"><span></span>scroll to learn more<br></br>or click on our logo to get started</a>
      </section>
    </>
  );
}
