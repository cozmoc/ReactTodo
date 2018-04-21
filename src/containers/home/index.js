import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
import './index.css';

class Home extends React.Component {

  componentDidMount() {
    this.props.getTodos();
  }

  render() {
    const props = this.props;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="well">
                <div className="pull-right">
                  <button onClick={() => { props.changeFilter(1) }} className={props.filter === 1 ? 'btn btn-primary btn-sm' : 'btn btn-default btn-sm'}>
                    All {props.todos.length}</button>
                  <button onClick={() => { props.changeFilter(2) }} className={props.filter === 2 ? 'btn btn-primary btn-sm' : 'btn btn-default btn-sm'}>
                    Active {props.todos.filter((todo) => {return !todo.completed}).length}</button>
                  <button onClick={() => { props.changeFilter(3) }} className={props.filter === 3 ? 'btn btn-primary btn-sm' : 'btn btn-default btn-sm'}>
                    Completed {props.todos.filter((todo) => {return todo.completed}).length}</button>
                </div>
                <h3>Todo List</h3>
                <form onSubmit={props.add} className="" role="form">
                  <div className="form-group">
                    <input autoFocus={true} onChange={props.handleChange} value={props.input.value} type="text" className="form-control" placeholder="Add todo"/>
                    <input type="submit" className="pull-right btn btn-success button-add" value="Add"/>
                  </div>
                </form>
                <br />
                <ul>
                  {
                    props.todos
                      .filter((todo) => {
                        switch (props.filter) {
                          case 1:
                            return todo;
                          case 2:
                            return !todo.completed;
                          default:
                            return todo.completed;
                        }
                      })
                      .map((todo) => {
                        return (
                          <li key={todo.id}>
                            <div className="text-right hidden-phone">
                            {!todo.isEditing && <span className="label label-xs label-primary">{todo.date}</span>}
                              <i> </i>
                              {!todo.completed && <button onClick={() => { props.edit(todo.id) }} className="btn btn-primary btn-xs"><i className={todo.isEditing ? "fa fa-thumbs-up" : "fa fa-pencil"}></i></button>}
                              <i> </i>
                              {!todo.isEditing && <button onClick={() => { props.complete(todo.id) }} className="btn btn-success btn-xs"><i className={todo.completed ? "fa fa-times" : "fa fa-check"}></i></button>}
                              <i> </i>
                              <button onClick={() => { props.remove(todo.id) }} className="btn btn-danger btn-xs"><i className="fa fa-trash-o"></i></button>
                              {
                                todo.isEditing ?
                                  <input autoFocus={true} value={todo.value} onChange={(event) => { props.edit(todo.id, event.target.value) }} className="col-md-10"/> :
                                  <strong className="pull-left">{todo.completed ? <strike>{todo.value}</strike> : <span>{todo.value}</span>}</strong>
                              }
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
          <button className="btn btn-danger btn-sm pull-right" onClick={() => props.deleteCompleted()}>Delete Completed</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  todos: state.todoActions.todos,
  input: state.todoActions.input,
  filter: state.todoActions.filter
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);