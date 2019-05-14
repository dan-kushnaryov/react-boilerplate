import React from 'react'
import { render } from 'react-dom'
import Loadable from 'react-loadable'

import 'bootstrap/dist/css/bootstrap.css'
import './styles/app.scss'

const routes = {
  '/': 'Todos',
  '/404': 'NotFound',
}

const DynamicComponent = Loadable({
  loader: async () => {
    const page = routes[window.location.pathname] || routes['/404']
    const componentModule = await import(`./pages/${page}`)
    const Component = componentModule.default

    return Component
  },
  delay: 300,
  loading () {
    return <div>Loading...</div>
  },
  render (Component) {
    return <Component />
  },
})

render(
  <DynamicComponent />,
  document.getElementById('app')
)

module.hot.accept()
