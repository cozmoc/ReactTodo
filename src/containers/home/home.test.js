import React from 'react';
import ReactDOM from 'react-dom';
import Home from './index';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Link } from 'react-router-dom';
import store, { history } from '../../store';
import Enzyme, { shallow, render, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import {
  add,
  remove,
  complete,
  edit,
  handleChange,
  changeFilter,
  deleteCompleted,
  getTodos
} from '../../modules/todoActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });
global.shallow = shallow;
global.render = render;
global.mount = mount;

let todos = [{"_id":"5adde5cc87e7140004ab56be","value":"1","id":"del1j6wj7nr1524491723266","completed":false,"date":"2018 04 23","__v":0},{"_id":"5adde5cd87e7140004ab56bf","value":"2","id":"v5plmso1s71524491725083","completed":false,"date":"2018 04 23","__v":0},{"_id":"5adde5cd87e7140004ab56c0","value":"3","id":"6f3smdyjfq61524491725518","completed":false,"date":"2018 04 23","__v":0},{"_id":"5adde5ce87e7140004ab56c1","value":"4","id":"d5sm32k3xx1524491726109","completed":false,"date":"2018 04 23","__v":0}];
const mapStateToProps = state => ({
  todos,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  add,
  remove,
  complete,
  edit,
  handleChange,
  changeFilter,
  deleteCompleted,
  getTodos
}, dispatch);

let home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Home store={store}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
  json: () => Promise.resolve(todos)
}));

const component1 = new home.WrappedComponent(mapStateToProps, mapDispatchToProps);
const component2 = shallow(
  <Home store={store} />
);

it('connects props to component correctly', () => {
  expect(component1.props().todos).toEqual(todos);
});

it('gets todos correctly', () => {
  expect(component2.props().store.getState().todoActions.todos).toEqual(todos);
});

it('adds todos correctly', () => {
  component2.props().handleChange({ target: {value: 'test todo'} });
  component2.props().add({preventDefault:() => {}});
  expect(component2.props().store.getState().todoActions.todos.length).toEqual(todos.length + 1);
});

it('changes filter correctly', () => {
  component2.props().changeFilter(2);
  expect(component2.props().store.getState().todoActions.filter).toEqual(2);
});

it('completes todo correctly', () => {
  component2.props().complete('del1j6wj7nr1524491723266');
  expect(component2.props().store.getState().todoActions.todos[0].completed).toEqual(true);
});