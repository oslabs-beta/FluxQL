import React from 'react';

export default function splashContainer() {
  return (
    <>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
      <div id='homeTitle'>
        <img src='../assets/logoclear.png' width='300px' height='300px'></img>
        <span>Dra<span id='QL'>QL</span>a</span>
      </div>
      <section id="scrollDown" class="pointerDown">
        <a id="scrollDownLink"href="#aboutFlex"><span></span>Scroll</a>
      </section>
    </>
  );
}
