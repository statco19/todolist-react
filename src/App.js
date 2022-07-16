import TodoList from "./TodoList";
import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoRefName = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos) setTodos(storedTodos);
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoRefName.current.value;
    if(name === "") return;
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}];
    })
    todoRefName.current.value = null;
  }

  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoRefName} type="text" />
      <button>Clear</button>
      <button onClick={handleAddTodo}>Add</button>
      <div>0 left to do</div>
    </>
  )
}

export default App;
