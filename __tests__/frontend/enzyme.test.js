import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
//import { MockContext } from '../../testSetup/testContexts';
import * as MockContexts from '../../client/state/contexts';
import App from '../../client/App';
import NavBar from '../../client/components/navbar';
import PSQLGraph from '../../client/graphs/psqlGraph';
import AdviceGraph from '../../client/graphs/adviceGraph';

configure({ adapter: new Adapter() });

function shallowSetup() {
  const generalState = {
    onHomePage: true,
    URImodal: false,
    helpModal: false,
  };

  const enzymeWrapper = shallow(<NavBar />, {
    context: GeneralContext,
  });

  return {
    generalState,
    enzymeWrapper,
  };
}

describe('App', () => {
  it('renders correctly', () => {
    shallow(<App />);
  });

  it('contains two images', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('img').length).toEqual(2);
  });

  it('should render Home Page NavBar', () => {
    // set up mockState with real state name as prop, and state properties passed in
    const mockState = {
      generalState: {
        onHomePage: true,
        URImodal: false,
        helpModal: false,
      },
    };
    // jest spyOn can only spy on functions, which is why we created our custom useContext (clients/state/context.jsx)
    // we pass in mockState as context to the spy
    jest
      .spyOn(MockContexts, 'useGenContext')
      .mockImplementation(() => mockState);

    // wrapper shallow renders navbar
    const wrapper = shallow(<NavBar />);
    // create a variable that equal holds the boolean value of whether wrapper has a class of NavBarContainer
    const confirm = wrapper.hasClass('NavBarContainer');
    // expects confirm (boolean => true) to be true
    expect(confirm).toBe(true);
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
