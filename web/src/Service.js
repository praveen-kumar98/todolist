import axios from "axios";

const Service = {
  getTodos: async () => {
    const res = await axios.get("http://localhost:4000/api/todos");
    return res.data;
  },
  createTodo: async (title) => {
    const res = await axios.post("http://localhost:4000/api/todos", {
      title: title,
    });
    return res.data;
  },
  updateTodo: async (id, title) => {
    const res = await axios.put(`http://localhost:4000/api/todo/${id}`, { title: title });
    return res.data
  },
  deleteTodo: (id) => {
    return fetch(`http://localhost:4000/api/todo/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  },
};

export default Service;
