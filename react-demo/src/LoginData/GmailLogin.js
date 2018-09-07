import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
import fetch from 'isomorphic-fetch';
// import { BrowserRouter, Route, Link, Switch, NavLink } from "react-router-dom";
// import { Redirect } from 'react-router-dom'
// import { withRouter } from 'react-router-dom'
import WelcomeUser from '../UserData/WelcomeUser'
import { configData } from './config';
import candelalogo from '../Images/candelalogo.png'
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'reactstrap';
import backgroundimage from '../Images/dylan-gillis-533818-unsplash.jpg';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import { Chart, Axis, Series, Tooltip, Cursor, Line } from "react-charts";
import '../backgroundClr.css'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { fakeAuth, AuthButton, PrivateRoute } from './AuthExample'
import '../responsive.css'
const styles = theme => ({
  backgroundstyle: {
    backgroundImage: `url(${"backgroundimage"})`,
    // flexGrow: 1,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%"
    // resizeMode: 'cover',
    // width:null,
    // height:null,     
  },
  containerstyle: {
    height: '100%'
  }
});

class GmailLogin extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      redirectToReferrer: false
    };
    // this.redirect=this.redirect.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)
  }
  // responseGoogle()
  // {
  //   this.props.history.push(`/welcomeuser`);
  // }  
  responseGoogle = (googleUser) => {

    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });

    // debugger;  
    // this.setState({googleUser:googleUser})

    console.log({ googleUser })

    // fetch('http://localhost:4000/getcurrentuser', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(res => {
    // debugger  
    // }).catch(err => err);


    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();
    var u3 = googleUser.getBasicProfile().U3;

    var userid = googleUser.getBasicProfile().Eea;
    console.log({ googleId });

    localStorage.setItem("loginUserId", userid);
    // console.log({ accessToken: id_token });
    console.log('Google User' + googleUser)
    console.log(googleUser.getBasicProfile())
    const product = this.state;

    fetch('http://localhost:4000/employees', {
      method: 'POST',
      body: JSON.stringify(googleUser.getBasicProfile()),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res;
      console.log(res)
    }).catch(err => err);
    // -------------------------------------------------------------------------------------------
    fetch('http://localhost:4000/users', {
      method: 'POST',
      body: JSON.stringify(googleUser.getBasicProfile()),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res;
      console.log(res)
    }).catch(err => err);
    // -------------------------------------------------------------------------------------------

    // if(u3.endsWith("@candelalabs.io"))
    {
      if(u3=='girish.upadhyay@candelalabs.io')
      {
    this.props.history.push(`/adminpage`);

      }
      else
      {
        this.props.history.push(`/welcomeuser`);
      }
    // this.props.history.push({
    //   pathname:   `/welcomeuser `,
    //   // search: '?query=abc',
    //   state: { detail: googleUser }
    // })

    }
    // else
    // {
    //   alert("Enter valid credentials")
    // }

  //   if (u3 == 'girish.upadhyay@candelalabs.io') {
  //     this.props.history.push(`/adminpage`);
  //   }
  //   else {
  //     this.props.history.push(`/welcomeuser`);
  //   }
  }

  render() {

    const { classes } = this.props;

    const { from } = this.props.location.state || { from: { pathname: "/login" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (

      //     // {/* <img src={candelalogo}/> */}
      //     <div>
      //     <Grid style={{minHeight:1000,backgroundRepeat:'no-repeat',backgroundSize:'cover'}} className={classes.backgroundstyle} responsive>
      //         <div className="center_div">
      //         <center>
      //             <Row>
      //                 <Col xs="8" style={{padding:"164px", marginLeft:"286px"}}>
      //                 <Paper style={{height:"auto"}}>
      //                 <label style={{color:"rgb(119, 73, 154)"}}><h5>Candela Labs</h5></label>
      //                <Row> <img src={candelalogo} style={{padding:"14px",marginLeft:"168px"}}/></Row>
      //                    <h5>Please login with Candela Labs Gmail ID</h5>
      //                     <GoogleLogin socialId="524011285577-r99ll1df435ogbv15fffl7j2c8o1bfa7.apps.googleusercontent.com"
      //       className="google-login"
      //       scope="profile"
      //       fetchBasicProfile={true}
      //       responseHandler={this.responseGoogle}
      //       buttonText="Login With Gmail"
      //       style={{backgroundColor:"#d14836", borderColor:"#d14836",color:"white",margin:"30px"}}
      //     />
      //     </Paper>
      //                 </Col>

      //                 </Row>
      //             </center>
      //         </div>
      //      </Grid>
      //  </div>
      <div className="backgrndcolor">
        <div>

          <div className="divLogin loginDiv" style={{ textAlign: "center" }}>
            <Row>
              <Col className="col-md-12 col-sm-12" >
                <img src={candelalogo} />
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col className="col-12 ">
                <p style={{ color: "black" }} className="example1 loginfont">Please Login With your Candelalabs Id</p>
              </Col>
            </Row>
            <Row style={{ marginBottom: "30px" }}>
              <Col className="col-12 loginButton">
                <GoogleLogin
                  socialId="524011285577-r99ll1df435ogbv15fffl7j2c8o1bfa7.apps.googleusercontent.com"
                  className="google-login"
                  scope="profile"
                  fetchBasicProfile={true}
                  responseHandler={this.responseGoogle}
                  buttonText="Login With Gmail"
                  size="sm"
                  className="example"
                  style={{ backgroundColor: "#d14836", borderColor: "#d14836", color: "white",padding:"6px 60px" }}
                />
              </Col>
            </Row>

          </div>
        </div>
      </div>
    );
  }
}
GmailLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GmailLogin);