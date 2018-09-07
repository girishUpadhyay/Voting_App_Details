import React from 'react';
import ReactDOM from 'react-dom';
import { configData } from '../LoginData/config'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Dialog from 'react-bootstrap-dialog'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card, CardHeader, CardFooter, CardBody,
  CardTitle, CardText, Button, Container, Row, Col
} from 'reactstrap';

import { AuthButton } from '../LoginData/AuthExample';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import WelcomeMessage from '../UserData/WelcomeMessage'

// import reactstrapCjs from 'reactstrap';

// Some are optional
import GoogleLogout from 'react-google-login';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Typography from '@material-ui/core/Typography';
import { Hidden } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch';
import { GoogleLogin } from 'react-google-login-component';
import '../buttonstyle.css';
import '../App.css';
import '../responsivenessUser.css';
import Chart from '../charts/chart';

// ---------------expansion panels-----------------------
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// ========================================================
import { Bar, Line, Pie } from 'react-chartjs-2';
import '../appbars.css'


const styles = theme => ({
  // root: {
  //   flexGrow: 1,

  // },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 1,
  },
  flex: {
    flex: 1,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 1200,
  },
});


class WelcomeUser extends React.Component {

  constructor() {
    super();
    this.state = {
      // setting the state of the products
      auth: true,
      anchorEl: null,
      products: [],
      val: [],
      votes: [],
      users: [],
      product: {
        qtitle: '',
        qdescription: ''
      },
      qoptions: [],
      isyes: false,
      isyes: true,
      open: false,
    }
    this.questionDetailsSave = this.questionDetailsSave.bind(this);
    this.renderProduct = this.renderProduct.bind(this);
  }
  // handleClick = () => {
  //   this.setState(prevState => ({
  //     isToggle: !prevState.isToggle
  //   }));
  // }
  // ------------logout google------------------

  logout() {

    debugger
  }

  // ---------------------All for the alert box-------------------------------

  // ---------For the appbar menu----------------------------------------------

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  // ----------------------------------------------------------------------------
  componentDidMount() {
    this.getProducts();
    this.getUsers();
    this.getVoteCount();
    console.log('Values=====' + this.state.values)
  }
  componentWillMount() {
    this.getUsers();
    // this.getVoteCount()
  }
  feedbackPage = _ => {

    this.props.history.push(`/feedback`)
  }

  getUsers = _ => {
    debugger

    fetch('http://localhost:4000/users')
      .then(response => response.json()
        .then(response => this.setState({ val: response.data }))
      )
      .catch(err => console.error(err))
  }
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
    location: 'City'
  }
  // need to delete it 
  getOptionData = _ => {

    fetch('http://localhost:4000/getoptionscount')
      // .then(response => response.json())
      .then(response => this.setState({ qoptions: response.data }))
      .catch(err => console.error(err))

    console.log(this.state.qoptions)

  }

  getVoteCount = _ => {


    debugger
    fetch('http://localhost:4000/votingcount')
      .then(votesc => votesc.json()
        .then(votesc => this.setState({ votes: votesc.data }))


      )

      .catch(err => console.error(err))
  }

  getProducts = _ => {


    // fetch('http://localhost:4000/question')
    //   .then(response => response.json())
    //   .then(response => this.setState({ products: response.data }))
    //   .catch(err => console.error(err))
    fetch('http://localhost:4000/getOption')
      .then(opt => opt.json())
      .then(opt => {

        fetch('http://localhost:4000/getuserquestion?userid=' + localStorage.getItem('loginUserId'))
          .then(ques => ques.json())
          .then(ques => {
            debugger
            fetch('http://localhost:4000/getvotingresponse?userId=' + localStorage.getItem('loginUserId'))
              .then(votes => votes.json())
              .then(votes => {
                debugger
                ques.data.forEach(element => {
                  element.questionOptions = opt.data.filter(i => i.qid == element.qid);
                  element.voteDetails = votes.data.filter(i => i.qid == element.qid);

                });

                this.setState({ products: ques.data })
              })
              .catch(err => console.error(err))

            //getvotingresponse            
          }
          )
          .catch(err => console.error(err))

      }
      )
      .catch(err => console.error(err))
  }

  renderData({ Eea, ig, ofa, wea, Paa, U3 }) {

    return <p>{U3}</p>
  }

  // -------------------SAVE QUESTION DETAILS ALONG WITH  USERID-----------------------

  questionDetailsSave() {
    debugger

    // fetch('http://localhost:4000/addquestion', {
    //   method: 'POST',
    //   body: JSON.stringify({userid:values.Eea, qid : element.qid, isYes : element.isYes, isNo : element }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(res => {
    //   return res;     
    //   console.log(res)
    // }).catch(err => err);
    alert('Hello')
  }

  renderProduct = (obj, values, props) => {
    // debugger
    // id : configData.id;
    const { name } = props;
    const { classes } = props;
    const { showComponent } = this.state;
    var { votes } = this.state;
    const { chartData } = this.state

    function yesClick(obj) {
      obj.isno = false;
      obj.isyes = true;
    }

    function noClick(obj) {
      obj.isyes = false;
      obj.isno = true;
    }

    function optionClick(obj, optionAvailable) {
      optionAvailable.selectedOption = obj.id;
    }

    const display = (element) => {
      debugger
      if (!element.optionid && !element.questionOptions.selectedOption) {
        // alert('Atleast choose one value');
        alert('Please select an Option and Submit')

      }
      else {
        var userId = localStorage.getItem("loginUserId");
        element.is
        fetch('http://localhost:4000/addquestion', {
          method: 'POST',
          body: JSON.stringify({ userid: userId, qid: element.qid, optionId: element.questionOptions.selectedOption }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          //return res;
          console.log(res)
          window.location.reload();
        }).catch(err => err);
      }
    }
    // this.questionDetailsSave = this.questionDetailsSave.bind(this);
    const paper = {
      margin: 20,
      padding: 10,
    }
    var dateFormat = require('dateformat');
    return (
      <div style={{ marginTop: "30px" }}>
        <Container>
          <Row>
            <Col xs="12" sm="12" md="8">
              <Card>
                <CardHeader className="cardWelcomePageHeader">{obj.qtitle}</CardHeader>
                <CardBody>
                  {/* <CardTitle>Special Title Treatment</CardTitle> */}
                  <CardText>
                    <Row>
                      <Col className="col-12">

                        <span className="cardText">{obj.qdescription}</span>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "10px" }}>
                      <Col className="col-12">
                        <span style={{ fontWeight: "bolder" }}>Posted On:</span>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "15px" }}>
                      <Col className="col-12">
                        <h7>{dateFormat(obj.date_time, "fullDate")}</h7>
                      </Col>
                    </Row>
                    <Row style={obj.optionid ? { 'display': 'none' } : {}}>
                      <Col className="col-12">
                        <h6>Please give us your opinion</h6>
                      </Col>
                    </Row>
                    <Row >
                      <Col className="col-12" >
                        {/* <div style={ obj.optionid && obj.userid == localStorage.getItem('loginUserId')? { 'display': 'none' } : {}}> */}
                        <div style={obj.voteDetails && obj.voteDetails.length > 0 ? { 'display': 'none' } : {}} >
                          {obj.questionOptions.map((element) =>
                            <label className="radio-inline" style={{ marginRight: "20px" }}>

                              <input type="radio" checked={element.isCheck} name="optradio" onClick={() => optionClick(element, obj.questionOptions)} />
                              {element.optionvalue}
                            </label>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "10px" }}>
                      <Col className="col-12">

                        {/* <Button size="sm" style={ obj.optionid && obj.userid == localStorage.getItem('loginUserId')? { 'display': 'none' } : {}} type="button" onClick={() => display(obj)} value={obj} className="btnAdmin">Submit </Button> */}

                        <Button style={obj.voteDetails && obj.voteDetails.length > 0 ? { 'display': 'none' } : {}} size="sm" type="button" onClick={() => display(obj)} value={obj} className="btnAdmin">Submit </Button>
                        <Dialog ref={(el) => { this.dialog = el }} />
                        <span style={obj.voteDetails && obj.voteDetails.length > 0 ? {} : { 'display': 'none' }} className="afterVoting">You have already voted  </span>
                      </Col>
                    </Row>
                  </CardText>
                </CardBody>
                <CardFooter className="text-muted">
                  <ExpansionPanel style={{ width: "100%" }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography > Click Here to View Resut</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>
                        < div className="chart" style={{ widows: "100%" }} >
                          <Chart data={votes} qData={obj.qid} />
                        </div>
                        {/* {votes.map((element) => (obj.qid == element.qid) ? element.optionvalue + '=' + ' ' + (element.total_votes) + ' \r\n' : null)} */}
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
  click = () => {
    this.props.responseGoogle(this.props.googleUser);
    // var i=this.props.googleUser.getBasicProfile().ig;

    // alert(i)
  }

  render() {
    const { classes } = this.props;
    const { products, product, val, votes } = this.state;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (

      <div>
        <div className={classes.root}>
          {/* <AppBar position="static" style={{ backgroundColor: "rgb(88, 109, 207);" }}>
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                <span className="example"> Welcome {val.ig}</span>               
              </Typography>
              <span style={{marginTop:"25pxpx", marginRight:'10px'}}>       
              <AuthButton/>
              </span>
             <Button className="btnAdmin" onClick={this.feedbackPage}>Feedback</Button>
              <Avatar alt="Remy Sharp" value="Hello Girish" src={val.Paa} className={classes.avatar} />
            </Toolbar>  
          </AppBar> */}

          {/* --------------------------------------------------------------------- */}

          <AppBar position="static" className="" style={{ flexGrow: 1, backgroundColor: "#ebedee", color: "black" }}>
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                  <Avatar alt="Remy Sharp" src={val.Paa} className={classes.avatar} />
                </IconButton>
                <span className="fontSizeUserWelcome" >  Welcome {val.ig}</span>
              </Typography>
              {/* <Button className="btnAdmin" onClick={this.feedbackPage}>Feedback</Button> */}
              {auth && (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar "
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem style={{ marginTop: "10px" }} onClick={this.handleClose}><AuthButton /></MenuItem>
                    <MenuItem style={{ color: "#f88a00", fontWeight: "bolder" }} onClick={this.handleClose}>
                      <span onClick={this.feedbackPage}>Feedback</span>
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
          <WelcomeMessage />
        </div>
        <Dialog ref={(el) => { this.dialog = el }} />
        {products.map(this.renderProduct)}
        {/* <button  googleUser={this.props.googleUser} onClick={this.click}>Click to view
               </button>
               {configData.id} */}
        {/* <button>Click</button>
        <button onClick={this.feedbackPage}>Give Feedback</button> */}
      </div>
    )
  }
}
WelcomeUser.propTypes = {
  classes: PropTypes.object.isRequired,
};
// export default AdminPostQuestion;
export default withStyles(styles)(WelcomeUser);