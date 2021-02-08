// for sample database
import SampleSchema from '../sampleData/schemaString';
import SampleResolver from '../sampleData/resolverString';
import treeData from '../sampleData/treeData';
// ! need to import sample data for advice console & mongo graph (this is a stretch)

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
};



export const generalReducer = (state, action) => {
  switch (action.type) {
    case 'ON_HOME_PAGE':
      return {
        ...state,
        onHomePage: true,
      }
    case 'NOT_HOME_PAGE':
      return {
        ...state,
        onHomePage: false,
      }
    case 'OPEN_URI_MODAL':
      return {
        ...state,
        URImodal: true,
      }
    case 'CLOSE_URI_MODAL':
      return {
        ...state,
        URImodal: false,
      }
    case 'OPEN_HELP_MODAL':
      return {
        ...state,
        helpModal: true,
      }
    case 'CLOSE_HELP_MODAL':
      return {
        ...state,
        helpModal: false,
      }
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
    case 'USE_SAMPLE':
      return {
        ...state,
        schema: SampleSchema,
        resolver: SampleResolver,
      };
    case 'SHOW_SCHEMA': 
      return {
        ...state,
        showSchema: true
      };
    case 'SHOW_RESOLVER': 
      return {
        ...state,
        showSchema: false
      };
  }
};

export const psqlReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_D3TABLES': 
      return {
        ...state,
        d3Tables: action.payload.d3Tables,
      }
    case 'USE_SAMPLE': 
      return {
        ...state,
        d3Tables: treeData
      }
    };
  };
    
export const mongoReducer = (state, action) => {
    switch (action.type) {
    case 'UPDATE_D3TABLES': 
      return {
        ...state,
        d3Tables: action.payload.d3Tables,
      }
    case 'USE_SAMPLE': 
      return {
        ...state,
        //d3Tables: treeData
      }
  };
};

export const adviceReducer = (state, action) => {
  // need type: update_advice
  // type: use_sample
};