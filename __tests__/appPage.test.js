import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../client/App'
import AdviceGraph from '../client/graphs/adviceGraph'

const server = setupServer(
  rest.get('/', (req, res, ctx) => {
    return res(ctx.json({}))
  })
);

beforeAll(() => server.listen())
afterEach(()=> server.resetHandlers())
afterAll(() => server.close())

test('loads home page', async () => {
  render()
})

describe('Renders Components', () => {
  test('renders App', () => {
    render(<App/>);
  });

  test('renders advice graph', () => {
    render(<AdviceGraph/>);
  });
});