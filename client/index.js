import React from 'react';
import { render } from 'react-dom';
import App from './App.tsx';

import './styles/styles.scss';

console.log('hi from index.js');

render(<App />, document.getElementById('root'));