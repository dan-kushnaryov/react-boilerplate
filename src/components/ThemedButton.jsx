/* eslint-disable react/button-has-type */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { ThemeContext } from '../common/theme-context'

export default class ThemedButton extends React.Component {
  static contextType = ThemeContext

  render () {
    const { props, context: theme } = this

    return (
      <button
        {...props}
        style={{ backgroundColor: theme.background }}
      />
    )
  }
}
