import React, { useState } from "react";
import axios from "axios";

export default function InputTodo() {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await axios.post("http://localhost:5000/todos", body);
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <h1 className="text-center">Pern Todo List</h1>
      <form className="d-flex mt-5 justify-content-center align-items-center">
        <div>
          <label htmlFor="description" className="form-label">
            Deskripsi
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onSubmitForm}
          >
            Kirim
          </button>
        </div>
      </form>
    </div>
  );
}
