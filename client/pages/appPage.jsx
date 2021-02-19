import React, { useContext, useEffect, useReducer } from 'react';
import { GeneralContext, CodeContext, PSQLContext, MongoContext, AdviceContext, URIContext } from '../state/contexts';
import {
  initialCodeState, codeReducer,
  initialPsqlState, psqlReducer,
  initialMongoState, mongoReducer,
  initialAdviceState, adviceReducer
} from '../state/reducers';

import GraphContainer from '../containers/graphContainer';
import CodeContainer from '../containers/codeContainer';
import AdviceContainer from '../containers/adviceContainer';
import URIModal from '../modals/URIModal';


export default function appPage() {

  const [codeState, codeDispatch] = useReducer(codeReducer, initialCodeState);
  const [psqlState, psqlDispatch] = useReducer(psqlReducer, initialPsqlState);
  const [mongoState, mongoDispatch] = useReducer(mongoReducer, initialMongoState);
  const [adviceState, adviceDispatch] = useReducer(adviceReducer, initialAdviceState);


  const { generalState } = useContext(GeneralContext);

  useEffect(() => {
    // if URI Modal is open, blur out the background
    const fullApp = document.getElementById('AppPage');
    const appHeader = document.getElementById('appHeader');

    if (generalState.URImodal) {
      fullApp.style.filter = 'blur(1.5px)';
      appHeader.style.filter = 'blur(1.5px)';
    } else {
      fullApp.style.filter = 'none';
      appHeader.style.filter = 'none';
    }
  }, [generalState.URImodal]);


  return (
    <div className="AppPageGrid">
      <URIContext.Provider value={{
        codeDispatch,
        psqlDispatch,
        mongoDispatch,
        adviceDispatch
      }}>
        {generalState.URImodal ? <URIModal /> : null}
      </URIContext.Provider>

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
          <CodeContainer />
        </CodeContext.Provider>

        <AdviceContext.Provider
          value={{
            adviceState,
            adviceDispatch
          }}>
          <AdviceContainer />
        </AdviceContext.Provider>

      </div>
    </div>
  )
};