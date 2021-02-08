import React, { useContext, useEffect, useReducer } from 'react';
import {GeneralContext, CodeContext, PSQLContext, MongoContext, AdviceContext, URIContext } from '../state/contexts';
import { 
  initialCodeState, codeReducer,
  initialPsqlState, psqlReducer,
  initialMongoState, mongoReducer,
  initialAdviceState, adviceReducer } from '../state/reducers';

import GraphContainer from '../containers/graphContainer';
import CodeContainer from '../containers/codeContainer';
import AdviceContainer from '../containers/adviceContainer';
import URIModal from '../modals/URIModal'


export default function appPage() {
  
  const [codeState, codeDispatch] = useReducer(codeReducer, initialCodeState);
  const [psqlState, psqlDispatch] = useReducer(psqlReducer, initialPsqlState);
  const [mongoState, mongoDispatch] = useReducer(mongoReducer, initialMongoState);
  const [adviceState, adviceDispatch] = useReducer(adviceReducer, initialAdviceState);


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
        <PSQLContext.Provider
          value={{
            psqlState,
            psqlDispatch
          }}>
          <GraphContainer />
        </PSQLContext.Provider>

        <CodeContext.Provider
            value={{
              codeState, 
              codeDispatch
            }}>
          <CodeContainer/>
        </CodeContext.Provider>
        
        <AdviceContainer/>

        <URIContext.Provider value={{
          codeDispatch,
          psqlDispatch,
          mongoDispatch,
          //adviceDispatch
        }}>
          {generalState.URImodal ? <URIModal /> : null}
        </URIContext.Provider>
      </div>
    </div>
  )
};

/*
      <AdviceContext.Provider
        value={{
          
        }}>
        <AdviceContainer/>
      </AdviceContext.Provider>
*/