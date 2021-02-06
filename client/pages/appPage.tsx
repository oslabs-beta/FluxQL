import React from 'react'

import GraphContainer from '../containers/graphContainer';
import CodeContainer from '../containers/codeContainer';
import AdviceContainer from '../containers/adviceContainer';

export default function appPage() {
  return (
    <div className="AppPageGrid">
      <div className='AppPage'>
        <GraphContainer />
        <CodeContainer/>
        <AdviceContainer/>
      </div>
    </div>
  )
};