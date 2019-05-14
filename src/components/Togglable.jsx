import React from 'react'

export default class Togglable extends React.Component {
  state = {
    show: false,
  }

  toggle = () => {
    this.setState(prevState => ({ show: !prevState.show }))
  }

  render () {
    return this.props.children(this.state.show, this.toggle)
  }
}
