/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { orderBy } from 'lodash'
import { Button } from 'react-bootstrap'
import React from 'react'
import todosApi from '../common/api/todos'
import TodosList from '../components/TodosList'

export default class Landing extends React.Component {
  constructor (props) {
    super(props)

    this.searchInput = React.createRef()
    this.sort = {
      id: 'asc',
      title: 'asc',
      completed: 'asc',
      userId: 'asc',
    }

    this.state = {
      todos: [],
      sort: this.sort,
    }
  }

  async componentDidMount () {
    const todos = await todosApi.getAll()

    this.searchInput.current.focus()

    this.setState({ todos })
  }

  sortBy (field) {
    const { sort, todos } = this.state
    const order = sort[field] === 'asc' ? 'desc' : 'asc'

    this.setState({
      todos: orderBy(todos, [field], [order]),
      sort: {
        ...this.sort,
        [field]: order,
      },
    })
  }

  render () {
    const { todos } = this.state

    return (
      <div>
        <Button variant='primary'>Primary</Button>
        <form>
          Title: <input ref={this.searchInput} type='search' />
        </form>
        <table>
          <tr>
            <td onClick={() => this.sortBy('id')}>ID</td>
            <td onClick={() => this.sortBy('title')}>Title</td>
            <td onClick={() => this.sortBy('completed')}>Completed</td>
            <td onClick={() => this.sortBy('userId')}>User ID</td>
          </tr>
          <TodosList todos={todos} />
        </table>
      </div>
    )
  }
}
