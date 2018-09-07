import React from "react";
import {Button} from 'reactstrap'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import Logins from './Logins'
import GmailLogin from '../LoginData/GmailLogin'
import WelcomeUser from '../UserData/WelcomeUser';
import SendEmail from '../SendEmail';
import AdminLogin from '../AdminDetails/AdminLogin';
import GoogleLogout from 'react-google-login';

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

const AuthExample = () => (
  <Router>
    <div>
      {/* <Route path="/public" component={Public} /> */}
      <Route exact path="/login" component={GmailLogin} />
      {/* <PrivateRoute exact  path="/welcomeuser" component={WelcomeUser} /> */}
      <Route exact  path="/welcomeuser" component={WelcomeUser} />
      <Route exact path="/feedback" component={SendEmail}/>
      {/* <PrivateRoute exact path="/adminpage" component={AdminLogin}/> */}
      <Route exact path="/adminpage" component={AdminLogin}/>
        {/* <Route exact path="/login" component={GmailLogin} />        
      {localStorage.getItem("loginUserId") == "100666767187112826909" ? <PrivateRoute exact path="/adminpage" component={AdminLogin}/> :<PrivateRoute exact path="/welcomeuser" component={WelcomeUser}/>}
      <PrivateRoute exact path="/feedback" component={SendEmail}/> */}
    </div>
  </Router>
);

// export class FakeAutho extends React.Component{

//   constructor(props){
//     super(props)
//     this.state={
//       isAuthenticated:false
//     }
//     this.authenticate=this.authenticate.bind(this);
//     this.signout=this.signout.bind(this)
//   }

//   authenticate(cb) {
//    this.setState(this.state.isAuthenticatedtrue)
//     setTimeout(cb, 100); // fake async
//   }
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// }

var isUser = localStorage.getItem("loginUserId");

export const fakeAuth = {
  
  isAuthenticated: isUser ? true : false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    localStorage.removeItem('loginUserId');
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export const AuthButton = 
withRouter(
  ({ history }) =>
 
    fakeAuth.isAuthenticated ? (
      <p>
        <span style={{backgroundColor:"white", color:"#f88a00", fontWeight:"bolder"}} 
          onClick={() => {
            fakeAuth.signout(() => history.push("/login"));
          }}
        >
          Sign out
        </span>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);


  
 export const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <div>
        <Component {...props}  />      
        </div>
     
      ) : (
        <Redirect
          to={{
            pathname: "/login",
// state: { from: props.location }
          }}
        />
      )
    }
  />
);

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;

// class Logins extends React.Component {
//   state = {
//     redirectToReferrer: false
//   };

//   login = () => {
//     fakeAuth.authenticate(() => {
//       this.setState({ redirectToReferrer: true });
//     });
//   };

//   render() {
//     const { from } = this.props.location.state || { from: { pathname: "/" } };
//     const { redirectToReferrer } = this.state;

//     if (redirectToReferrer) {
//       return <Redirect to={from} />;
//     }

//     return (
//       <div>
//         <p>You must log in to view the page at {from.pathname}</p>
//         <button onClick={this.login}>Log in</button>
//       </div>
//     );
//   }
// }


export default AuthExample;