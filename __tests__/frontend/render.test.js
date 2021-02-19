import * as React from 'react';
import '../../testSetup/setupTests';
import { server, rest, onRoot } from '../../testSetup/testServer';

import { render, fireEvent, screen } from '@testing-library/react';

// overall SPA
import App from '../../client/App';
import NavBar from '../../client/components/navbar';

//
import TeamContainer from '../../client/containers/teamContainer';
import DemoContainer from '../../client/containers/demoContainer';
import HomePage from '../../client/pages/homePage';

// /app
import AppPage from '../../client/pages/appPage';
import AdviceGraph from '../../client/graphs/adviceGraph';

describe('Renders Home Page', () => {
  test('renders App', () => {
    render(<App />);
  });

  test('renders TeamContainer', () => {
    render(<TeamContainer />);
  });

  test('renders DemoContainer', () => {
    render(<DemoContainer />);
  });

  test('renders HomePageContainer', () => {
    render(<HomePage />);
  });

  // if page properly renders, "Demo & Description" text will be displayed
  test('renders Home Page Component', async () => {
    const { findByText } = render(<HomePage />);
    const element = await findByText(/Demo & Description/i);
    expect(element).toBeInTheDocument();
  });

  test('testing the onRoot', async () => {
    const ok = await onRoot();
    expect(ok).toBe({ greeting: 'hello world' });
  });
});
