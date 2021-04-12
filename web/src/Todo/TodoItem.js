import { useState } from "react";

const TodoItem = ({
  _id,
  deleteTodo,
  editTodo,
  toggleTodoCompleted,
  completed,
  title
}) => {
  const [field, setField] = useState("");
  const [isEdditing, setIsEdditing] = useState(false);

  const handleChange = (e) => setField(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(_id, field);
    setField("");
    setIsEdditing(false);
  };

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <input id={_id} type="text" value={field} onChange={handleChange} />
      <div>
        <button type="button" onClick={() => setIsEdditing(false)}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div>
      <div>
        <input
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTodoCompleted(_id)}
        />
        <label htmlFor={_id}>
          {title}
        </label>
      </div>
      <div>
        <button type="button" onClick={() => setIsEdditing(true)}>
          Edit
        </button>
        <button type="button" onClick={() => deleteTodo(_id)}>
          Delete
        </button>
      </div>
    </div>
  );

  return <div>{isEdditing ? editingTemplate : viewTemplate}</div>;
};

export default TodoItem;
