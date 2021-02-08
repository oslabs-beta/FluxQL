import React, { useContext, useEffect } from 'react';
import {GeneralContext} from '../state/contexts';

import GraphContainer from '../containers/graphContainer';
import CodeContainer from '../containers/codeContainer';
import AdviceContainer from '../containers/adviceContainer';

export default function appPage() {
  
  const { generalState } = useContext(GeneralContext);

  useEffect(() => {
    const fullAppPage = document.getElementById('AppPage');
    if (!generalState.URIModal){
      fullAppPage.style.filter = 'blur(1.5px)';
    } else {
      fullAppPage.style.filter = 'none';
    }
  }, [generalState.URImodal])


  return (
    <div className="AppPageGrid">
      <div id='AppPage'>
        <GraphContainer />
        <CodeContainer/>
        <AdviceContainer/>
      </div>
    </div>
  )
};