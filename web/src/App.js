import { useState, useEffect } from "react";
import Form from "./Todo/form";
import FilterButton from "./Todo/FilterButton";
import TodoItem from "./Todo/TodoItem";
import Service from "./Service";

const filters = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const filterName = Object.keys(filters);

function App() {
  useEffect(() => {
    Service.getTodos()
      .then((data) => setTasks(data))
      .catch((err) => {
        setTasks([]);
        setError(err);
      });
    return () => null;
  }, []);

  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null); // eslint-disable-line no-use-before-define
  const toggleTodoCompleted = (id) => {
    const updatedTodos = tasks.map((task) => {
      if (id === task._id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTodos);
  };
  const addTodo = (title) => {
    Service.createTodo(title)
      .then((data) => {
        const newTask = data;
        setTasks([...tasks, newTask]);
      })
      .catch((err) => setError(err));
  };
  const deleteTodo = (id) => {
    Service.deleteTodo(id)
      .then((data) => {
        const remainingTodos = tasks.filter((task) => id !== task._id);
        setTasks(remainingTodos);
      })
      .catch((err) => setError(err));
  };
  const editTodo = (id, title) => {
    Service.updateTodo(id, title)
      .then((data) => {
        const editedTodos = tasks.map((task) => {
          if (id === task._id) {
            return { ...task, title: title };
          }
          return task;
        });
        setTasks(editedTodos);
      })
      .catch((err) => setError(err));
  };
  return (
    <div>
      <Form addTodo={addTodo} />
      <div>
        {filterName.map((name) => (
          <FilterButton
            key={name}
            name={name}
            pressed={name === filter}
            setFilter={setFilter}
          />
        ))}
      </div>
      <div>
        {tasks.filter(filters[filter]).map((task) => (
          <TodoItem
            key={task._id}
            _id={task._id}
            title={task.title}
            completed={task.completed}
            toggleTodoCompleted={toggleTodoCompleted}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            key={task._id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
