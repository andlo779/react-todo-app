import React, { useState, useEffect } from "react"
import {v4 as uuidv4 } from "uuid"

import Header from "./Header"
import InputTodo from "./InputTodo"
import TodosList from "./TodosList"

const TodoContainer = () => {
  const [todos, setTodos] = useState(getInitialTodos())

  const handleChange = id => {
    setTodos(prevState =>
      prevState.map(todo => {
        if(todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo;
      })
    )
  }

  const deleteTodo = id => {
    setTodos([
      ...todos.filter(todo => {
        return todo.id !== id
      })
    ])
  }

  const addTodoItem = title => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  const setUpdate = (updateTitle, id) => {
    setTodos(
      todos.map(todo => {
        if(todo.id === id) {
          todo.title = updateTitle
        }
        return todo
      })
    )
  }

  function getInitialTodos() {
    const fetchedTodos = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(fetchedTodos)
    return loadedTodos || []
  }

  useEffect(() => {
    const todosAsString = JSON.stringify(todos)
    localStorage.setItem("todos", todosAsString)
  }, [todos])

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo addTodoProps={addTodoItem}/>
        <TodosList
          todos={todos}
          handleChangeProps={handleChange}
          deleteTodoProps={deleteTodo}
          setUpdate={setUpdate}
        />
      </div>
    </div>
  )
}

export default TodoContainer
