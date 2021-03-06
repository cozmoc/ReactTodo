import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';
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
  <App />
));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <App />
        </div>
      </ConnectedRouter>
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('routes to Home Component on click on Home', () => {
  expect(component1.children().at(1).get(0).props.children[0].props.path).toEqual('/');
});

it('routes to About Component on click on About', () => {
  expect(component1.children().at(1).get(0).props.children[1].props.path).toEqual('/about');
});

