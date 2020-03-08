import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { StoreContext } from 'redux-react-hook'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import store from './store'
import Home from './views/Home.jsx'
import KarolCard from './components/Authors/KarolCard'

ReactDOM.render(
  <BrowserRouter>
    <StoreContext.Provider value={store}>
      <Switch>
        <Route path='/karol' component={KarolCard} />
        <Route path='/' component={Home} />
      </Switch>
    </StoreContext.Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
