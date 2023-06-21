import React from 'react'
import './App.css'
import { Provider } from 'mobx-react'
import Router from './router'

import rootStore from './stores'

function App() {
  return (
    <Provider {...rootStore}>
      <Router />
    </Provider>
  )
}

export default App
