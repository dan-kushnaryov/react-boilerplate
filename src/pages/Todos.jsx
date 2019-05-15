/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { orderBy } from 'lodash'
import { Button } from 'react-bootstrap'
import React from 'react'
import todosApi from '../common/api/todos'
import TodosList from '../components/TodosList'
import { ThemeContext, themes } from '../common/theme-context'
import ThemedButton from '../components/ThemedButton'

function Toolbar (props) {
  return (
    <ThemedButton onClick={props.toggleTheme}>
      Change Theme
    </ThemedButton>
  )
}

export default class Landing extends React.Component {
  searchInput = React.createRef()

  sort = {
    id: 'asc',
    title: 'asc',
    completed: 'asc',
    userId: 'asc',
  }

  state = {
    todos: [],
    sort: this.sort,
    theme: themes.light,
  }

  async componentDidMount () {
    const todos = await todosApi.getAll()

    this.searchInput.current.focus()

    this.setState({ todos })
  }

  toggleTheme = () => {
    this.setState(state => ({
      theme:
        state.theme === themes.dark
          ? themes.light
          : themes.dark,
    }))
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
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar toggleTheme={this.toggleTheme} />
        </ThemeContext.Provider>

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
