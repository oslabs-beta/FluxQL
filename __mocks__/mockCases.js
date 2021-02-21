import React from 'react';
import {jest} from '@jest/globals';

// set up mockState with real state name as prop, and state properties passed in

export const homeGenState = {
  generalState: {
    onHomePage: true,
    URImodal: false,
    helpModal: false,
  },
};

export const appGenState = {
  generalState: {
    onHomePage: false,
    URImodal: false,
    helpModal: false,
    generalDispatch: jest.fn(),
  },
};