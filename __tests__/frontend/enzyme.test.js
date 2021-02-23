import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import { useLocation } from 'react-router-dom';

// import custom useContext
import * as MockContexts from '../../client/state/contexts';

// import mock cases
import { homeGenState, appGenState } from '../../__mocks__/mockCases';

// React Components
import App from '../../client/App';
import NavBar from '../../client/components/navbar';
import PSQLGraph from '../../client/graphs/psqlGraph';
import AdviceGraph from '../../client/graphs/adviceGraph';

configure({ adapter: new Adapter() });

xdescribe('<App> renders on the browser', () => {
  const wrapper = shallow(<App />);

  /** ! took out this one
  it('renders correctly', () => {
    shallow(<App />);
  });*/

  it('App contains Logo and Logotext', () => {
    expect(wrapper.find('img').length).toEqual(2);
  });
});

describe('Dynamic NavBar Displays', () => {
  it('NavBar renders initially', () => {
    // jest spyOn can only spy on functions, which is why we created our custom useContext (clients/state/context.jsx)
    // we pass in our mock state as context to the spy
    jest
      .spyOn(MockContexts, 'useGenContext')
      .mockImplementation(() => homeGenState);

    const wrapper = shallow(<NavBar />);
    // create a variable that equal holds the boolean value of whether wrapper has a class of NavBarContainer
    const confirm = wrapper.hasClass('NavBarContainer');
    // expects confirm (boolean => true) to be true
    expect(confirm).toBe(true);
  });

  it('Home Page Navbar renders', () => {
    jest
      .spyOn(MockContexts, 'useGenContext')
      .mockImplementation(() => appGenState);
    const wrapper = shallow(<NavBar location = '/'/>);
    //const playLink = wrapper.find('Link').childAt(3).text();
    const playLink = wrapper.find('Link').text()
    expect(playLink).toEqual('Play');
  });

  it('App Page NavBar renders', () => {
    jest
      .spyOn(MockContexts, 'useGenContext')
      .mockImplementation(() => appGenState);

    const wrapper = shallow(<NavBar location='/app'/>);

    const homeLink = wrapper.find('Link').text();
    const testLink = wrapper.find('.link').at(0)
    testLink.simulate('click');
    expect(homeLink).toEqual('Home');
    expect(location.pathname).toEqual('/');
  });
});


describe('Rendering graph', () => {
  it('should render radial tree correctly', () => {
    const mockState = {
      psqlState: {
        d3Tables: {
          name: 'Star Wars',
          children: [
            {
              name: 'People',
            },
          ],
        },
      },
    };

    jest
      .spyOn(MockContexts, 'usePSQLContext')
      .mockImplementation(() => mockState);

    const wrapper = shallow(<PSQLGraph />);
    const confirm = wrapper.find('svg').length; // should be 1
    expect(confirm).toBe(1);
  });

  it('should render advice graph correctly', () => {
    const mockState = {
      adviceState: {
        advice: [
          {
            Type: 'Queries',
            Amount: 1,
            Description: 'string',
            Example: 'string',
          },
        ],
      },
    };
    jest
      .spyOn(MockContexts, 'useAdviceContext')
      .mockImplementation(() => mockState);

    const wrapper = shallow(<AdviceGraph />);
    const confirm = wrapper.hasClass('container');
    expect(confirm).toBe(true);
  });
});
