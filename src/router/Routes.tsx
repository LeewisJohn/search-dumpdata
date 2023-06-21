import React from 'react'
import { observer } from 'mobx-react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import ProductList from '../components/ProductList'
import { history } from '../stores'

const RouteApps = () => {
  return (
    <BrowserRouter >
      <Routes location={history.location}>
        <Route path="/" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default observer(RouteApps)
