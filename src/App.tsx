import './App.css';
import { useState } from 'react';
import { ImBin } from "react-icons/im";
import { PiCopyrightFill } from "react-icons/pi";

interface Todo {
  name: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
});
  const [inputValue, setInputValue] = useState<string>('');

  const newTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addTodo = async () => {
   if (inputValue.trim() === "") {
      alert("Empty tasks not supported");
      return;
    }
    const updatedTodos = [...todos, { name: inputValue, completed: false }]
    setTodos(updatedTodos);
    setInputValue('');
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const deleteTodo = (key: number) => {
    const filteredTodos = todos.filter((_, id) => id !== key);
    setTodos(filteredTodos)
    localStorage.setItem('todos', JSON.stringify(filteredTodos));
  };

  return (
    <div className='app'>
      <h1>DAILY <br />TODO LIST</h1>
      <div className='inputContainer'>
        <input
          value={inputValue}
          type="text"
          placeholder='Enter new task'
          onChange={newTodo}
          className='todoField'
        />
        <button onClick={addTodo}>Add Task</button>
      </div>
      {todos.length !== 0 && (
        <div className="todosContainer">
          {todos.map((todo, id) => (
            <div key={id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>{
                  const updatedTodos = todos.map((t, tid) =>
                    tid === id ? { ...t, completed: !t.completed } : t
                  )
                  setTodos(updatedTodos)
                  localStorage.setItem('todos', JSON.stringify(updatedTodos))
                }}
              />
              <p className={todo.completed ? 'completed' : 'uncompleted'}>{todo.name}</p>
              <button onClick={() => deleteTodo(id)} aria-label="Delete task">
                <ImBin />
              </button>
            </div>
          ))}
        </div>
      )}
      <p className='footer'>
        <PiCopyrightFill style={{ fontSize: 'x-large' }} /> 2025 iBen technologies.
      </p>
    </div>
  );
}

export default App;