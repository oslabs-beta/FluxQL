/* eslint-disable indent */
// for sample database
import SampleSchema from '../sampleData/schemaString';
import SampleResolver from '../sampleData/resolverString';
import treeData from '../sampleData/treeData';
import adviceSample from '../sampleData/adviceSample';

export const initialGeneralState = {
  onHomePage: true,
  URImodal: false,
  helpModal: false,
};

export const initialCodeState = {
  schema: '',
  resolver: '',
  showSchema: true,
};

export const initialPsqlState = {
  d3Tables: {},
};

export const initialMongoState = {
  d3Tables: {},
};

export const initialAdviceState = {
  advice: [],
};

export const generalReducer = (state, action) => {
  switch (action.type) {
    case 'ON_HOME_PAGE':
      return {
        ...state,
        onHomePage: true,
      };
    case 'NOT_HOME_PAGE':
      return {
        ...state,
        onHomePage: false,
      };
    case 'OPEN_URI_MODAL':
      return {
        ...state,
        URImodal: true,
      };
    case 'CLOSE_URI_MODAL':
      return {
        ...state,
        URImodal: false,
      };
    case 'OPEN_HELP_MODAL':
      return {
        ...state,
        helpModal: true,
      };
    case 'CLOSE_HELP_MODAL':
      return {
        ...state,
        helpModal: false,
      };
  }
};

export const codeReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CODE':
      return {
        ...state,
        schema: action.payload.schema,
        resolver: action.payload.resolver,
      };
    case 'SHOW_SCHEMA':
      return {
        ...state,
        showSchema: true,
      };
    case 'SHOW_RESOLVER':
      return {
        ...state,
        showSchema: false,
      };
  }
};

export const psqlReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_D3TABLES':
      return {
        ...state,
        d3Tables: action.payload,
      };
  }
};

export const mongoReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_D3TABLES':
      return {
        ...state,
        d3Tables: action.payload,
      };
  }
};

export const adviceReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ADVICE':
      const newState = { ...state };
      newState.advice = action.payload.advice;
      newState.dynamicText = action.payload.dynamicText;
      newState.staticText = action.payload.staticText;

      delete newState.displayExample;

      return newState;
    case 'SHOW_EXAMPLE':
      return {
        ...state,
        displayExample: action.payload,
      };
  }
};
