export const ADD = 'todoActions/ADD';
export const REMOVE = 'todoActions/REMOVE';
export const COMPLETE = 'todoActions/COMPLETE';
export const HANDLECHANGE = 'todoActions/HANDLECHANGE';

const initialState = {
  todos: [],
  input: {
    value: '',
    id: randomId(),
    completed: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        todos: [].concat(state.todos, state.input),
        input: {
          value: '',
          id: randomId(),
          completed: false
        }
      }

    case 'REMOVE':
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          return todo.id !== action.payload.id;
        })
      }

    case 'COMPLETE':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.completed = true;
          }
          return todo;
        })
      }

    case 'CHANGE_TEXT':
      return {
        ...state,
        input: {
          value: action.payload,
          id: randomId()
        }
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

export const complete = (todoId) => {
  return dispatch => {
    dispatch({
      type: 'COMPLETE',
      payload: todoId
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
