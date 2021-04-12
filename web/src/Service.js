const Service = {
  getTodos: () => {
    return fetch("http://localhost:4000/api/todos").then((r) => r.json());
  },
  createTodo: (title) => {
    return fetch("http://localhost:4000/api/todos", {
      method: "POST",
      body: JSON.stringify({ title: title }),
      headers: { "Content-Type": "application/json" },
    });
  },
  updateTodo: (id, title) => {
    return fetch(`http://localhost:4000/api/todo/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: title }),
      headers: { "Content-Type": "application/json" },
    });
  },
  deleteTodo: (id) => {
    return fetch(`http://localhost:4000/api/todo/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  },
};

export default Service;
