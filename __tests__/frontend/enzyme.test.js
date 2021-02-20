import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import App from '../../client/App';

configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders correctly', () => {
    shallow(<App />);
  });

  it('includes two images', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('img').length).toEqual(2);
  });
});
