export const initialGeneralState = {
  URImodal: false,
  helpModal: false,
};

export const initialHomeState = {
  overview: `DraQLA is a GraphQL migration assistance tool that empowers developers to build GraphQL schemas by 
  introspecting existing PostGreSQL databases, all without writing any code.`,
  info: [
    [
      `First, start by importing the desired PostgreSQL database that you want to convert into a GraphQL API and enter 
      the URI as prompted. (If you don't have one, feel free to test with our Sample Database!)`,
      '../assets/modal.gif',
      'Getting Started',
    ],
    [
      `DraQLa will immediately start by extracting all of your database's tables and relationships, 
      and will generate compatible GraphQL schemas, which consists of types and their corresponding 
      resolvers.`,
      '../assets/types.gif',
      'Extract Table Relationships',
    ],
    [
      `DraQLa also features a user friendly visual representation that depicts the parts of your database 
      that can now be queried and manipulated via GraphQL.`,
      '../assets/graphgif.gif',
      'Visualize Your Schema',
    ],
    [
      `The Advice Console provides an overview on: GraphQL schema, 
      how you and your clients can access and manipulate your database, and
      a sample query and mutation.`,
      '../assets/advice.gif',
      'Advice and Overview',
    ],
    [
      `In addition to your new schema, DraQLa spins up a temporary GraphQL server to allow you to test out 
      the sample query via GraphQL's Playground.`,
      '../assets/playground.gif',
      'Test Your Queries',
    ],
    [
      `When you're ready to adopt your schema, click "Export" to receieve the code and further integration 
    instructions.`,
      '',
      'Export Your Code',
    ],
  ],
  humans: [ 
    {name: 'Emily Krebs', profilePic: '../assets/emily.jpg', github: 'https://github.com/emilykrebs', linkedin: 'https://www.linkedin.com/in/emilyrkrebs/'}, 
    {name: 'Ross Sarcona', profilePic: '../assets/ross.jpg', github: 'https://github.com/RossRSarc', linkedin: 'https://www.linkedin.com/in/rosssarcona/'}, 
    {name: 'Daniel Dolich', profilePic: '../assets/daniel.jpg', github: 'https://github.com/danieldolich', linkedin: 'https://www.linkedin.com/in/daniel-dolich-2a5a97206/'},
    {name: 'Heidi Kim', profilePic: '../assets/heidi.jpg', github: 'https://github.com/heidiyoora', linkedin: 'https://www.linkedin.com/in/heidiykim/'},
    {name: 'Tommy Liang', profilePic: '../assets/tommy.jpg', github: 'https://github.com/mrtommyliang', linkedin: 'https://www.linkedin.com/in/mrtommyliang/'}  
  ]
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

export const homeReducer = (state, action) => {
  switch (action.type) {
    case '':
      return {
        ...state,

      };
};
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
