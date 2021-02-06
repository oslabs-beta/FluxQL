import React from 'react'

export default function exportButton() {
  // need to pass down state for finalized schema & resolvers


  const handleExport = () => {
    console.log('export clicked');
  }


  return (
    <button id='exportButton' onClick={handleExport}>Export</button>
  )
};
