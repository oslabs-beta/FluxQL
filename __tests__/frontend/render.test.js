import * as React from 'react';
import '../../testSetup/setupTests';
import { server, rest } from '../../testSetup/testServer';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

// overall SPA
import App from '../../client/App';
import NavBar from '../../client/components/navbar';

// Home Page
import TeamContainer from '../../client/containers/teamContainer';
import DemoContainer from '../../client/containers/demoContainer';
import HomePage from '../../client/pages/homePage';

// App Page
import AppPage from '../../client/pages/appPage';
import AdviceGraph from '../../client/graphs/adviceGraph';

//
// import { TestGeneralContext } from '../../testSetup/testContexts.jsx';

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

describe('Renders website', () => {
  describe('Renders SPA', () => {
    test('renders App', () => {
      render(<App />);
    });
  });

  describe('Testing React Router with NavBar', () => {
    /*
      import: userEvent, createMemoryHistory, Router 
      clicking on play > home > play
      create a variable called history that should equal ['/', 'app', '/']
      create a variable to store the "rendered" Navbar that is wrapped around <Router>
      as we click, the end points will be put into a rendered array that is initialized as an empty array
    */
    test('renders NavBar', () => {
      const history = createMemoryHistory();
      render(
        <Router history={history}>
          <NavBar />
        </Router>
      );

      expect(screen.getByText(/about/i));
    });
  });

  describe('Renders Home Page', () => {
    test('renders HomePageContainer', () => {
      render(<HomePage />);
    });

    test('renders TeamContainer', () => {
      render(<TeamContainer />);
    });

    test('renders DemoContainer', () => {
      render(<DemoContainer />);
    });
  });

  // if page properly renders, "Demo & Description" text will be displayed
  test('renders Home Page Component', async () => {
    const { findByText } = render(<HomePage />);
    const element = await findByText(/Demo & Description/i);
    expect(element).toBeInTheDocument();
  });

  // test('testing the onRoot', async () => {
  //   const ok = await onRoot();
  //   expect(ok).toEqual({ greeting: 'hello world' });
  //   const hi = 'hi';
  //   expect(hi).toEqual('hi');
  // });
});
