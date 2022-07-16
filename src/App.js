import TodoList from "./TodoList";
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const todoRefName = useRef();

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
    <TodoList todos={todos} />
      <input ref={todoRefName} type="text" />
      <button>Clear</button>
      <button onClick={handleAddTodo}>Add</button>
      <div>0 left to do</div>
    </>
  )
}

export default App;
