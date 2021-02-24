import React, { createContext, useContext } from 'react';

export const GeneralContext = createContext();
export const CodeContext = createContext();
export const PSQLContext = createContext();
export const MongoContext = createContext();
export const AdviceContext = createContext();
export const URIContext = createContext();
export const HomeContext = createContext();

// creating custom useContext for testing purposes. Jest/Enzyme does not have a way to test and provide consumers context.
export const useGenContext = () => useContext(GeneralContext);
export const usePSQLContext = () => useContext(PSQLContext);
export const useAdviceContext = () => useContext(AdviceContext);
export const useHomeContext = () => useContext(HomeContext);
