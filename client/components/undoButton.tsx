import React from 'react'

export default function undoButton() {
  return (
    <div className="buttonClass" onClick={() => console.log('undo clicked')}>
      <span className="noselect">Undo</span>
      <div id="circle"></div>
    </div>
  )
}
