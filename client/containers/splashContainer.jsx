import React from 'react';
import { Link } from 'react-router-dom';

export default function splashContainer() {
  return (
    <>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
      <Link to='/' id='mainLink'>
        <div id='homeTitle'>
          <img src='../assets/logoclear.png' width='300px' height='300px'></img>
          <span>Dra<span id='QL'>QL</span>a</span>
        </div>
      </Link>
      <section id="scrollDown" className="pointerDown">
        <a id="scrollDownLink"href="#about"><span></span>scroll to learn more<br></br>or click on our logo to get started</a>
      </section>
    </>
  );
}
