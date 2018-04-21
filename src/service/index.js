const url = 'http://48d7d574.ngrok.io';

export default {
  getTodos: (input) => {
    return fetch(`${url}/todos`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    }).then((res) => res.json());
  },
  addTodo: (input) => {
    return fetch(`${url}/add`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(input)
    });
  },
  removeTodo: (id) => {
    return fetch(`${url}/remove`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({id})
    });
  },
  completeTodo: (id) => {
    return fetch(`${url}/complete`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({id})
    });
  },
  editTodo: (todo) => {
    return fetch(`${url}/edit`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
  },
  deleteCompleted: () => {
    return fetch(`${url}/delete_completed`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({})
    });
  },
}