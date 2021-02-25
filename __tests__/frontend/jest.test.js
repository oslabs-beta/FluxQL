// import * as React from 'react';
// import '../../__mocks__/setupTests';
// import { render, fireEvent, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
// import { server, rest } from '../../__mocks__/mockServer';
// // overall SPA
// import App from '../../client/App';
// import NavBar from '../../client/components/navbar';

// // Home Page
// import TeamContainer from '../../client/containers/teamContainer';
// import DemoContainer from '../../client/containers/demoContainer';
// import HomePage from '../../client/pages/homePage';

// // App Page
// import AppPage from '../../client/pages/appPage';
// import AdviceGraph from '../../client/graphs/adviceGraph';

// // prep the mock contexts
// let realUseContext;
// let useContextMock;

// // establish API mocking before all tests
// beforeAll(() => server.listen());
// // set up the mock context before each test
// beforeEach(() => {
//   realUseContext = React.useContext;
//   useContextMock = React.useContext = jest.fn();
// });

// // reset any request handlers that are declared as a part of our tests
// // (i.e. for testing one-time error scenarios)
// afterEach(() => {
//   // clean up the mock context
//   React.useContext = realUseContext;
//   server.resetHandlers();
// });
// // clean up once the tests are done
// afterAll(() => server.close());

// xdescribe('Renders website', () => {
//   describe('Renders Home Page', () => {
//     test('renders Home Page Component', async () => {
//       const { findByText } = render(<HomePage />);
//       const element = await findByText(/Team Members/i);
//       expect(element).toBeInTheDocument();
//     });

//     test('renders TeamContainer', async () => {
//       const { findByText } = render(<TeamContainer />);
//       const element = await findByText(/Heidi/i);
//       expect(element).toBeInTheDocument();
//     });

//     test('renders DemoContainer', async () => {
//       const { findByText } = render(<DemoContainer />);
//       // multiple instances of a word will break, need to search for something specific
//       const element = await findByText(/GraphQL migration assistance/i);
//       expect(element).toBeInTheDocument();
//     });
//   });

//   // test('testing the onRoot', async () => {
//   //   const ok = await onRoot();
//   //   expect(ok).toEqual({ greeting: 'hello world' });
//   // });
// });
