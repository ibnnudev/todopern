const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes-----
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/todos/:id", async (req, res) => {
  // req params akan mengambil data pada url dengan prefix ":{nama_data}"
  const { id } = req.params;
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const todo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(todo.rows);
  } catch (error) {
    console.error(error);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const todo = await pool.query(
      "UPDATE todo SET description=$1 WHERE todo_id=$2 RETURNING *",
      [description, id]
    );
    res.json(todo.rows);
  } catch (error) {
    console.error(error);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("Todo was deleted");
  } catch (error) {
    console.error(error);
  }
});

app.listen(5000, () => {
  console.log("server has running in port 5000");
});
