// import React from 'react'
// import {BrowserRouter as Router, Route} from 'react-router-dom'
import WelcomeUser from '../UserData/WelcomeUser'
import AdminLogin from '../AdminDetails/AdminLogin'
import SendEmail from '../SendEmail'

// import LoginDetails from './LoginDetails'
import Login from './Login'
import GmailLogin from '../LoginData/GmailLogin';
import LoginWelcome from '../LoginData/LoginWelcome'


// function Home()
// {

//     return<h1>Home component</h1>
// }
// function AfterLogin(){

//     return <p>You have successfully logged in</p>
// }

// export default class RoutingEx extends React.Component {
//   render() {
//     return (
//       <Router>
//         <div>
//         <Route exact path='/' component={GmailLogin} />
//           {/* <Route exact path='/login' component={Login} /> */}
//           <Route exact path='/afterlogin' component={AfterLogin}  />
//           <Route exact path='/welcomeuser' component={WelcomeUser}/>
//           <Route exact path='/adminpage' component={AdminLogin}/>
//           <Route exact path='/feedback' component={SendEmail}/>
//         </div>
//       </Router>
//     )
//   }
// }

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

const RoutingEx = () => (
  <Router>
    <div>
      <AuthButton />
      <Route exact path="/" component={GmailLogin} />
      {/* <Route exact path="/login" component={Logins} /> */}
      <PrivateRoute path="/welcomeuser" component={WelcomeUser} />
    </div>
  </Router>
);

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        {/* <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button> */}
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class Logins extends React.Component {
  state = {
    redirectToReferrer: false
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default RoutingEx;