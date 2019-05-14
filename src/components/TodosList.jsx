import React from 'react'

export default function Todos ({ todos }) {
  return todos.map(todo => (
    <tr key={todo.id}>
      <td>{todo.id}</td>
      <td>{todo.title}</td>
      <td>{todo.completed}</td>
      <td>{todo.userId}</td>
    </tr>
  ))
}
