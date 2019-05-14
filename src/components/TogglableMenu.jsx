/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react'
import Togglable from './Togglable'

export default function (props) {
  return (
    <Togglable>
      {(show, toggle) => (
        <div>
          <button onClick={toggle}>{props.title}</button>
          {show ? props.children : null}
        </div>
      )}
    </Togglable>
  )
}
