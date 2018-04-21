export const ADD = 'todoActions/ADD';
export const REMOVE = 'todoActions/REMOVE';
export const COMPLETE = 'todoActions/COMPLETE';
export const HANDLECHANGE = 'todoActions/HANDLECHANGE';

const initialState = {
  todos: [],
  input: {
    value: '',
    id: randomId(),
    completed: false,
    date: new Date().toJSON().slice(0,10).replace(/-/g,' ')
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      if (!state.input.value.trim()) return state;
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
