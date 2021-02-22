import React from 'react';
import { hydrate } from 'react-dom';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.scss';

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>, 
  document.getElementById('root')
);
