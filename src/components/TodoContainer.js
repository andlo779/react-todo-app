import React from "react"
import {v4 as uuidv4 } from "uuid"

import Header from "./Header"
import InputTodo from "./InputTodo"
import TodosList from "./TodosList"

class TodoContainer extends React.Component {
  state = {
   todos: []
  };

  handleChange = id => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if(todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo;
      }),
    }))
  }

  deleteTodo = id => {
    this.setState({
      todos: [
        ...this.state.todos.filter(todo => {
          return todo.id !== id;
        })
      ]
    })
  }

  addTodoItem = title => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false
    };
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  }

  setUpdate = (updateTitle, id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if(todo.id === id) {
          todo.title = updateTitle
        }
        return todo
      }),
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.todos !== this.state.todos) {
      const todosToSave = JSON.stringify(this.state.todos)
      localStorage.setItem("todos", todosToSave)
    }
  }

  componentDidMount() {
    const fetchedTodos = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(fetchedTodos)
    if(loadedTodos) {
      this.setState({
        todos: loadedTodos
      })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo addTodoProps={this.addTodoItem}/>
          <TodosList
            todos={this.state.todos}
            handleChangeProps={this.handleChange}
            deleteTodoProps={this.deleteTodo}
            setUpdate={this.setUpdate}
          />
        </div>
      </div>
    );
  }
}
export default TodoContainer
