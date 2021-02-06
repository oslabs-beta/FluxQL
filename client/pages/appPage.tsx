import React from 'react'

import GraphContainer from '../containers/graphContainer';
import CodeContainer from '../containers/codeContainer';
import AdviceContainer from '../containers/adviceContainer';

export default function appPage({ handleHelpModal }) {
  return (
    <div className="AppPageGrid">
      <div id='AppPage'>
        <GraphContainer 
          handleHelpModal={handleHelpModal}
        />
        <CodeContainer/>
        <AdviceContainer/>
      </div>
    </div>
  )
};