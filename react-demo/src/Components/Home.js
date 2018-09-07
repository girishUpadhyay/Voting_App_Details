import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import LoginDetails from './LoginDetails'
class Home extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/login' component={LoginDetails} />
        </div>
      </Router>
    )
  }
}

export default  Home;