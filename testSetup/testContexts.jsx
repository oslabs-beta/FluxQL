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
// const testCodeContext = createContext();
// const testPSQLContext = createContext();
// const testMongoContext = createContext();
// const testAdviceContext = createContext();
// const testURIContext = createContext();

// const [generalState, generalDispatch] = useReducer(
//   generalReducer,
//   initialGeneralState
// );
// const [testCodeState, testCodeDispatch] = useReducer(
//   codeReducer,
//   initialCodeState
// );
// const [testPsqlState, testPsqlDispatch] = useReducer(
//   psqlReducer,
//   initialPsqlState
// );
// const [testMongoState, testMongoDispatch] = useReducer(
//   mongoReducer,
//   initialMongoState
// );
// const [testAdviceState, testAdviceDispatch] = useReducer(
//   adviceReducer,
//   initialAdviceState
// );

export const TestGeneralContext = ({ children }) => {
  <TestGeneralContext.Provider
    value={{
      generalState,
      generalDispatch,
    }}
  >
    {children}
  </TestGeneralContext.Provider>;
};

// export const genNavbarState = (navbar) => {
//   const generalState = initialGeneralState;
//   return navbar(general);
// };
