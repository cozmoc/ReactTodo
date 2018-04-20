export const ADD = 'todoActions/ADD';
export const REMOVE = 'todoActions/REMOVE';
export const COMPLETE = 'todoActions/COMPLETE';

const initialState = {
  todos: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        todos: [].concat(state.todos, action.payload)
      }

    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          return todo.id !== action.payload.id;
        })
      }

    default:
      return state
  }
}

export const add = () => {
  return dispatch => {
    dispatch({
      type: ADD
    });
  };
}

export const remove = () => {
  return dispatch => {
    dispatch({
      type: REMOVE
    });
  };
}

export const complete = () => {
  return dispatch => {
    dispatch({
      type: COMPLETE
    });
  };
}
