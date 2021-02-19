import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../client/App'
import AdviceGraph from '../client/graphs/adviceGraph'

describe('Renders Components', () => {
  test('renders App', () => {
    render(<App/>);
  });

  test('renders advice graph', () => {
    render(<AdviceGraph/>);
  });
});