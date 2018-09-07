import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Logins from './Logins'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/login' component={Logins} />
        </div>
      </Router>
    )
  }
}