import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  add,
  remove,
  complete,
  handleChange
} from '../../modules/todoActions';
import './index.css';

const Home = props => (
  <div>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="well">
            <h3>Todo List</h3>
            <form onSubmit={props.add} className="" role="form">
              <div className="form-group">
                <input onChange={props.handleChange} value={props.input.value} type="text" className="form-control" placeholder="Add todo"/>
                <input type="submit" className="pull-right btn btn-success button-add" value="Add"/>
              </div>
            </form>
            <br />
            <ul>
              {
                props.todos.map((todo) => {
                  return (
                    <li key={todo.id}>
                      <div className="text-right hidden-phone">
                        <strong>{todo.completed ? <strike className="pull-left">{todo.value}</strike> : <span className="pull-left">{todo.value}</span>}</strong>
                        <span className="label label-xs label-primary">{todo.date}</span>
                        <i> </i>
                        <button onClick={() => { props.complete(todo.id) }} className="btn btn-success btn-xs"><i className=" fa fa-check"></i></button>
                        <i> </i>
                        <button onClick={() => { props.remove(todo.id) }} className="btn btn-danger btn-xs"><i className="fa fa-trash-o"></i></button>
                      </div>
                      <br />
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </div>
      </div>
      <button className="btn btn-primary btn-sm pull-right" onClick={() => props.changePage()}>About me</button>
    </div>
  </div>
);

const mapStateToProps = state => ({
  todos: state.todoActions.todos,
  input: state.todoActions.input
});

const mapDispatchToProps = dispatch => bindActionCreators({
  add,
  remove,
  complete,
  handleChange,
  changePage: () => push('/about')
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);