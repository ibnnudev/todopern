import axios from "axios";
import React, { useState } from "react";

export default function EditTodo({ todo }) {
  const [description, setDescription] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const body = { description: description };
      await axios.put(`http://localhost:5000/todos/${todo.todo_id}`, body);
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#exampleModal${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        Ubah
      </button>

      <div
        className="modal fade"
        onClick={() => setDescription(todo.description)}
        id={`exampleModal${todo.todo_id}`}
        tabIndex="-1"
        aria-labelledby={`exampleModalLabel${todo.todo_id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id={`exampleModalLabel${todo.todo_id}`}
              >
                Formulir Ubah Todo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Deskripsi
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  defaultValue={todo.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Tutup
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Ubah
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
