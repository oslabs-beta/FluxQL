import React, { createContext, useReducer } from 'react';
import {
  initialCodeState,
  codeReducer,
  initialPsqlState,
  psqlReducer,
  initialMongoState,
  mongoReducer,
  initialAdviceState,
  adviceReducer,
  generalReducer,
  initialGeneralState,
} from '../client/state/reducers';

const testGeneralContext = createContext();
const testCodeContext = createContext();
const testPSQLContext = createContext();
const testMongoContext = createContext();
const testAdviceContext = createContext();
const testURIContext = createContext();

const [testGeneralState, testGeneralDispatch] = useReducer(
  generalReducer,
  initialGeneralState
);
const [testCodeState, testCodeDispatch] = useReducer(
  codeReducer,
  initialCodeState
);
const [testPsqlState, testPsqlDispatch] = useReducer(
  psqlReducer,
  initialPsqlState
);
const [testMongoState, testMongoDispatch] = useReducer(
  mongoReducer,
  initialMongoState
);
const [testAdviceState, testAdviceDispatch] = useReducer(
  adviceReducer,
  initialAdviceState
);

export const TestGeneralContext = ({ children }) => {
  <TestGeneralContext.Provider
    value={{
      testGeneralState,
      testGeneralDispatch,
    }}
  >
    {children}
  </TestGeneralContext.Provider>;
};
