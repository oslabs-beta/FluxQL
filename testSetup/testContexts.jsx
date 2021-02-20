import React, { useContext, createContext } from 'react';

export const useMockContext = () => useContext(MockContext);

const defaultGenState = {
  onHomePage: true,
  URImodal: false,
  helpModal: false,
};

export const MockContext = createContext(defaultGenState);

// export const StateProvider = ({ children }) => {
//   return <MockContext.Provider value={store}>{children}</MockContext.Provider>;
// };
