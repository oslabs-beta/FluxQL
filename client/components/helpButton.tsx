import React from 'react'

export default function helpButton({ handleHelpModal }) {
  return (
    <div id='btn' onClick={handleHelpModal}>
      <span className="noselect">Help</span>
      <div id="circle"></div>
    </div>
  )
}
