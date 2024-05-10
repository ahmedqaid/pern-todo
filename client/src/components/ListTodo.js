import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const [openEdit, setOpenEdit] = useState([false, ""]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos", {});
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/todo/" + id, {
        method: "DELETE",
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    setOpenEdit([true, todo]);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openEdit[0] && <EditTodo todo={openEdit[1]} closeEdit={setOpenEdit} />}
    </Fragment>
  );
};

export default ListTodos;
