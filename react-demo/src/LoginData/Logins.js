import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch, BrowserRouter,
  Redirect,
  withRouter
} from "react-router-dom";
import decode from 'jwt-decode'

const checkAuth = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!token || !refreshToken) {
      return false;
    }
  
    try {
      // { exp: 12903819203 }
     const { exp } = decode(refreshToken);
     console.log("3r4et5ryttyyyyyyyyyttttttttttttttttttttttttttttttttttttttttttt")
  
      if (exp < new Date().getTime() / 1000) {
        return false;
      }
  
    } catch (e) {
      return false;
    }
  
    return true;
  }
  
  const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      checkAuth() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
    )} />
  )
  
  
  
   export default () => (
     <BrowserRouter>
       <Switch>
         <Route exact path="/login" render={props => <Login {...props} />} />
         <Route exact path="/register" render={props => <Register {...props} />} />
 
        <AuthRoute exact path="/auth" component={Auth} />
        <Route exact path="/auth" render={props => <Auth {...props} />} />
       </Switch>
     </BrowserRouter>
   );

// export default()=>(
//   <BrowserRouter>
//   <Switch>
//     <Route exact path='/login' render={props=><Login {...props}/>}/>
//     <Route exact path='/register' render={props=><Register {...props}/>}/>
//     <Route exact path="/auth" render={props => <Auth {...props} />} />
//     <AuthRoute exact path='/auth' component={Auth}/>
//     </Switch>
//   </BrowserRouter>
// )

function Auth(){

  return <h4>This is for client side authentication</h4>
}


function Register(){

  return <h4>This is the Register Component</h4>
}

class Login extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
    <div>
      <label>Username:</label>
      <input type="text" className="form-control"/>
      <label>Password:</label>
      <input type="text" className="form-control"/>
      <input type="button" value="Submit"/>
      </div>
    )
  }
}

