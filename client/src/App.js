import "./App.css";
// components
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

function App() {
  return (
    <>
      <div className="container my-3">
        <InputTodo />
        <h3 className="mt-5">Daftar Todo</h3>
        <hr />
        <ListTodo />
      </div>
    </>
  );
}

export default App;
