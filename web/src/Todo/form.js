import { useState } from "react";

const Form = ({ addTodo }) => {
  const [name, setName] = useState("");
  const handleChange = (e) => setName(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(name);
    setName("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a todo"
        id="new-todo-input"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
