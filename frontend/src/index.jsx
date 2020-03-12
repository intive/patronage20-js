import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { StoreContext } from 'redux-react-hook'
import { BrowserRouter, Route } from 'react-router-dom'
import store from './store'
import Marta from '../../frontend/src/components/Marta'

ReactDOM.render(
  <BrowserRouter>
    <StoreContext.Provider value={store}>
      <Route component={Marta} />
    </StoreContext.Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
