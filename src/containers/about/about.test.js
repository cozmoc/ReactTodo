import React from 'react';
import ReactDOM from 'react-dom';
import about from './index';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from '../../store';
import Enzyme, { shallow, render, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
global.shallow = shallow;
global.render = render;
global.mount = mount;

const component1 = shallow((
  <about store={store} />
));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<about store={store} />, div);
  ReactDOM.unmountComponentAtNode(div);
});