import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { StoreContext } from 'redux-react-hook'
import { BrowserRouter, Route } from 'react-router-dom'
import store from './store'
import AboutMarta from '../../frontend/src/components/AboutMarta'

ReactDOM.render(
  <BrowserRouter>
    <StoreContext.Provider value={store}>
      <Route component={AboutMarta} />
    </StoreContext.Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
