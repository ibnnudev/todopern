import axios from "axios";
import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

export default function ListTodo() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      setTodos(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTodo = async (id, e) => {
    try {
      e.preventDefault();
      const response = await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div>
      <ul className="list-group">
        {todos.length === 0 && (
          <li className="list-group-item">Tidak ada data</li>
        )}
        {todos.map((todo) => {
          return (
            <li
              className="list-group-item d-flex align-items-center justify-content-between"
              key={todo.todo_id}
            >
              <span>{todo.description}</span>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  className="btn btn-primary me-md-2"
                  type="button"
                  onClick={(e) => deleteTodo(todo.todo_id, e)}
                >
                  Hapus
                </button>
                <EditTodo todo={todo} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
