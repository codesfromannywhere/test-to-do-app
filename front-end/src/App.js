import './App.css';
import React, {useEffect , useState} from "react"
import TodoForm from './components/TodoForm';
import Todo from './components/Todo';

function App() {

  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("")

  
  // wir werden hier was hinzufügen aber lokal

  const addTodo = (todo) => {
    const newTodos = [...todos, todo]
    setTodos(newTodos)
  } 

   // Damit werden wir was löschen
  const deleteTodo = (index) => {
    fetch('http://localhost:3001/todos/' + todos[index].id , {
      method: "DELETE"
    })
    const newTodos = [...todos];
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }


  useEffect(()=>{
    const getData = async () => {
      const result = await fetch('http://localhost:3001/todos', {})
      const data = await result.json()
      setTodos(data)
    }
    getData()
  }, [])



  // wir werden was hinzufügen und danach in der Datenbank speichern
  const handleSubmit = (e) => {

    e.preventDefault()
    addTodo({
      text: value,
      complete : false
    })

    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text:value,
        complete: false
      })
    })
    setValue('')

  }

  return (
    <div className="App">
      <h1>Todo List</h1>
     <TodoForm value={value} setValue={setValue} handleSubmit={handleSubmit} />
      <div>
        {todos.map((todo, index)=>{
          return (
            <Todo
            todo={todo}
            key={index}
            index={index}
            deleteTodo={deleteTodo}
            />
          )
        })}
      </div>
    </div>
  );
}

export default App;
