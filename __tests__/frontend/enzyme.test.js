import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
//import { MockContext } from '../../testSetup/testContexts';
import { GeneralContext, useGeneralContext } from '../../client/state/contexts';
import App from '../../client/App';
import NavBar from '../../client/components/navbar';

configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders correctly', () => {
    shallow(<App />);
  });

  it('contains two images', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('img').length).toEqual(2);
  });

  it('should mock the NavBar Gen Context', () => {
    const contextValues = {
      onHomePage: false,
      URImodal: false,
      helpModal: false,
    };
    jest
      .spyOn(GeneralContext, 'useGeneralContext')
      .mockImplementation(() => contextValues);
    const wrapper = shallow(<NavBar />);
    console.log(wrapper, 'wrapper');
    //expect(wrapper.text()).toBe('Play')
  });
});
