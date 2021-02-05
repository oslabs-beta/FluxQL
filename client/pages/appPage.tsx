import React from 'react'

import GraphContainer from '../containers/graphContainer';
import CodeContainer from '../containers/codeContainer';
import AdviceContainer from '../containers/adviceContainer';

export default function appPage() {
  return (
    <div className="appPageParent">
      <h1>APP PAGE</h1>
      <div className='AppPage'>
        <GraphContainer />
        <CodeContainer/>
        <AdviceContainer/>
      </div>
    </div>
  )
};