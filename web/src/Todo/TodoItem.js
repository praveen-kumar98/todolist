import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TodoItem = ({
  _id,
  deleteTodo,
  editTodo,
  toggleTodoCompleted,
  completed,
  title,
}) => {
  const [field, setField] = useState(title);
  const [isEdditing, setIsEdditing] = useState(false);

  const handleChange = (e) => setField(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(_id, field);
    setField("");
    setIsEdditing(false);
  };

  const editingTemplate = (
    <form className="edit" onSubmit={handleSubmit}>
      <input
        id={_id}
        className=""
        type="text"
        value={field}
        onChange={handleChange}
      />
      <div className="btn-grp">
        <button
          type="button"
          className="btn danger"
          onClick={() => setIsEdditing(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button type="submit" className="btn success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  );

  const animations = {
    initial: { scale: 0 },
    animate: { scale: 1,  opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { stiffness: 500, damping: 50 },
  };
  const viewTemplate = (
    <AnimatePresence>
      <motion.div {...animations} layout className="todo">
        <input
          id={_id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTodoCompleted(_id)}
        />
        <label htmlFor={_id}>{title}</label>
        <div className="btn-grp">
          <button
            type="button"
            className="btn success"
            onClick={() => setIsEdditing(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            type="button"
            className="btn danger"
            onClick={() => deleteTodo(_id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return <div>{isEdditing ? editingTemplate : viewTemplate}</div>;
};

export default TodoItem;