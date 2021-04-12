import React from 'react'

const TodoItem = ({id, toggleTodo, name, completed}) => {
    return (
        <div>
            <div>
                <input type="checkbox" id={id} defaultChecked={completed} onChange={() => toggleTodo(id)} />
                <label htmlFor={id}>{name}</label>
            </div>
            <div>
                <button></button>
            </div>
        </div>
    )
}

export default TodoItem
