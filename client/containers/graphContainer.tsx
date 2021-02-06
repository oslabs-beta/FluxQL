import React from 'react';
import RadialTree from '../graphs/radialTree'
import HelpButton from '../components/helpButton'
import UndoButton from '../components/undoButton'


export default function graphContainer({ handleHelpModal }) {
  return (
    <div className='GraphContainer'>
      <RadialTree />
      <div className="graphBtns">
        <UndoButton/>
        <HelpButton handleHelpModal={handleHelpModal} />
      </div>

      
    </div>
  )
};
