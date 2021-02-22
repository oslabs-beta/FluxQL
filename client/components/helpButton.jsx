import React from 'react';

export default function helpButton({ handleHelpModal }) {
  return (
    <div className="buttonClass" id="helpbtn" onClick={handleHelpModal}>
      <span className="noselect">Help</span>
      <div id="circle"></div>
    </div>
  );
}
