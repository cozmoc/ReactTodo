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
          <form onSubmit={props.add} className="form-inline" role="form">
            <div className="form-group">
              <input onChange={props.handleChange} value={props.input.value} type="text" className="form-control" placeholder="Add todo"/>
            </div>
            <input type="submit" className="btn btn-success" id="add-todo-button" value="Add"/>
          </form>
          <br />
          <div className="well">
          <h2>TODOS</h2>
          <ul>
            {
              props.todos.map((todo) => {
                return (
                  <li key={todo.id}>
                    <div className="text-right hidden-phone">
                      <span className="pull-left">{todo.value}</span>
                      <button onClick={() => { props.complete(todo.id) }} className="btn btn-success btn-xs"><i className=" fa fa-check"></i></button>
                      <i> </i>
                      <button className="btn btn-danger btn-xs"><i className="fa fa-trash-o "></i></button>
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