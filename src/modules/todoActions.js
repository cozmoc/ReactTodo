import service from '../service';

export const ADD = 'todoActions/ADD';
export const REMOVE = 'todoActions/REMOVE';
export const COMPLETE = 'todoActions/COMPLETE';
export const DELETE_COMPLETED = 'todoActions/DELETE_COMPLETED';
export const EDIT = 'todoActions/EDIT';
export const HANDLECHANGE = 'todoActions/HANDLECHANGE';

const initialState = {
  todos: [],
  input: {
    value: '',
    id: randomId(),
    completed: false,
    date: new Date().toJSON().slice(0,10).replace(/-/g,' ')
  },
  isEditing: false,
  filter: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      if (!state.input.value.trim()) return state;
      service.addTodo(state.input);
      return {
        ...state,
        todos: [].concat(state.todos, state.input),
        input: {
          value: '',
          id: randomId(),
          completed: false,
          date: new Date().toJSON().slice(0,10).replace(/-/g,' ')
        }
      }

    case 'REMOVE':
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          return todo.id !== action.payload;
        })
      }

    case 'COMPLETE':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            todo.completed = !todo.completed;
          }
          return todo;
        })
      }

    case 'EDIT':
      let newState = {};
      if (action.payload.text) {
        newState = {
          ...state,
          todos: state.todos.map((todo) => {
            if (todo.id === action.payload.id && todo.isEditing && action.payload.text.trim()) {
              todo.value = action.payload.text || todo.value;
              todo.date = new Date().toJSON().slice(0,10).replace(/-/g,' ');
            }
            return todo;
          })
        }
      } else {
        newState = {
          ...state,
          todos: state.todos.map((todo) => {
            if (todo.id === action.payload.id) {
              todo.isEditing = !todo.isEditing;
            }
            return todo;
          })
        }
      }
      return newState;

    case 'CHANGE_TEXT':
      return {
        ...state,
        input: {
          value: action.payload,
          id: randomId(),
          completed: false,
          date: new Date().toJSON().slice(0,10).replace(/-/g,' ')
        }
      }

    case 'CHANGE_FILTER':
      return {
        ...state,
        filter: action.payload
      }

    case 'DELETE_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter((todo) => {return !todo.completed})
      }

    default:
      return state
  }
}

function randomId() {
  return Math.random().toString(36).substr(2) + new Date().getTime();
};

export const add = (event) => {
  event.preventDefault();
  return dispatch => {
    dispatch({
      type: 'ADD'
    });
  };
}

export const remove = (todoId) => {
  return dispatch => {
    dispatch({
      type: 'REMOVE',
      payload: todoId
    });
  };
}

export const edit = (todoId, text) => {
  const payload = {
    id: todoId,
    text
  };
  return dispatch => {
    dispatch({
      type: 'EDIT',
      payload
    });
  };
}

export const complete = (todoId) => {
  return dispatch => {
    dispatch({
      type: 'COMPLETE',
      payload: todoId
    });
  };
}

export const deleteCompleted = () => {
  return dispatch => {
    dispatch({
      type: 'DELETE_COMPLETED'
    });
  };
}

export const changeFilter = (filter) => {
  return dispatch => {
    dispatch({
      type: 'CHANGE_FILTER',
      payload: filter
    });
  };
}

export const handleChange = (event) => {
  return dispatch => {
    dispatch({
      type: 'CHANGE_TEXT',
      payload: event.target.value
    });
  };
}
