import React, { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setTodos(data);
  }

  async function addTodo() {
    if (!title || !description) return;
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    setTitle("");
    setDescription("");
    getTodos();
  }

  async function toggleTodo(id, completed) {
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    getTodos();
  }

  async function deleteTodo(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    getTodos();
  }

  return (
    <div className="app">
      <h1 className="title">My very important todo list</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? "completed" : ""}>
            <div className="todo-content">
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
            </div>
            <div className="todo-actions">
              <button onClick={() => toggleTodo(todo._id, todo.completed)}>
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
