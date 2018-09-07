import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Container, Row, Col } from 'reactstrap';
// import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Typography from '@material-ui/core/Typography';
import { Hidden } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import '../App.css';
import '../App.js';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
  Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText
} from 'reactstrap';
import Chart from '../charts/chart'
import '../responsivenessUser.css'

// ---------------expansion panels-----------------------
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// ========================================================
// import validator from 'validator';
// const required = (value) => {
//   if (!value.toString().trim().length) {
//     // We can return string or jsx as the 'error' prop for the validated Component
//     return 'require';
//   }
// };
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 1200,
  },
});
// var SampleArray = ['girish', 'upadhyay'];
class AdminPostQuestion extends Component {
  constructor(props){
    super(props)
    this.refreshOnClick=this.refreshOnClick.bind(this);
  }
  state = {                                     // setting the state of the products
    products: [],
    product: {
      qtitle: '',
      qdescription: ''
    },
    qoptions: [],
    formErrors: { qtitle: '', qdescription: '' },
    qtitlelValid: false,
    qdescriptionValid: false,
    formValid: false,
    options: [],
    votes: [],
    isVisible: true,
    selectValue: '',
    questionid: null,
    //  optionValue:''
    values: ["gggg"]
  }
  // addOption=()=>{
  //   SampleArray.push( this.state.optionValue.toString() );
  // }
  componentDidMount() {
    this.getProducts();
    this.getVoteCount();
    // this.refreshTimer = setInterval(this.getVoteCount, 1000);
  }

  componentWillUnmount() {
    // clearInterval(this.refreshTimer);
  }
  refreshOnClick(){
    // this.getProducts();
    this.getVoteCount();
  }
  getVoteCount = _ => {
    debugger
    fetch('http://localhost:4000/votingcount')
      .then(votesc => votesc.json()
        .then(votesc => this.setState({ votes: votesc.data }))
      )
      .catch(err => console.error(err))
      
  }

  handleSelectedValue = (e) => {
    debugger
    this.setState({ selectValue: e.target.value });
    var abc = [];
    for (var i = 0; i < e.target.value; i++) {
      abc.push({ id: i, text: 'candela' })
    }
    this.setState({ options: abc });
    console.log(this.state.options)
  }

  handleChange(i, e) {
    // console.log(this.state.values)
    this.setState({

      values: { ...this.state.values, [i]: e.target.value }
    });
  }
  getProducts = _ => {
    fetch('http://localhost:4000/getOption')
      .then(opt => opt.json())
      .then(opt => {

        fetch('http://localhost:4000/products')
          .then(ques => ques.json())
          .then(ques => {

            ques.data.forEach(element => {
              element.questionOptions = opt.data.filter(i => i.qid == element.qid);
            });

            this.setState({ products: ques.data })
          }

          )
          .catch(err => console.error(err))

      }
      )
      .catch(err => console.error(err))
  }

  addProduct = _ => {
   
    if(this.state.product.qtitle=='' || this.state.product.qdescription=='')
    alert('Please Enter Title and Description')
    var finalVal = [];
    var finalState = this.state.values;
    var result = Object.keys(finalState).map(function (key) {
      return finalVal.push(finalState[key]);
    });
    // ----------------getting qid to save in the question_options
    const product = this.state;

    console.log(JSON.stringify(product.product.name))
    fetch('http://localhost:4000/products/add?qtitle=' + product.product.qtitle + '&qdescription=' + product.product.qdescription )

    // -----------------In case  You need it Copy and paste the below isVisible content 
    // + 'isVisible=' + this.state.isVisible
      // .then(response=>response.json())
      // window.location.reload()
      // .then(this.getProducts)
      .catch(err => console.error(err))
      

    fetch('http://localhost:4000/getqid')
      .then(response => response.json())
      .then(response => {
        this.setState({ questionid: response.data[0] })
        
        
        fetch('http://localhost:4000/options', {
          method: 'POST',
          // body: JSON.stringify(finalVal), 
          body: JSON.stringify({ optionvalue: finalVal, qid: this.state.questionid.qid }),
          // body: JSON.stringify({optionvalue:finalVal,qid:this.state.questionid}),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(this.getProducts)
          .then(res => {

            debugger
            //return res;
            console.log(res)
            

          }).catch(err => err);

          // -----iuyuiiiiiiiiiiiiii----------------------------
          
      })
      // this.setState({ Cart: [...this.state.Cart, ProductsJSON[productKey]]})
      .catch(err => console.error(err))
    console.log(this.state.questionid);
    // console.log(this.state.questionid)
    window.location.reload();
  }

  renderProduct=({ qid, qtitle, qdescription, date_time, isVisible, questionOptions }, props)=> {
    var { votes } = this.state;
    debugger
    function handleClick(isVisible, qid) {
      isVisible = !isVisible;
      fetch('http://localhost:4000/updatequestions', {
        method: 'POST',
        body: JSON.stringify({ isVisible: isVisible, qid: qid }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        //return res;
        console.log(res)
        window.location.reload('/adminpage');
      }).catch(err => err);
      // alert('ytghuj')
    }
    const { classes } = props;
    const paper = {
      margin: 20,
      padding: 10,
    }
    console.log("this.state.votes::", this.state.votes, votes);
    var dateFormat = require('dateformat');
    return (
      
      //       <Row>
      //         <Col xs="8">
      //           <Paper style={{ marginTop: 60, overflow: Hidden, height: "auto", flexGrow:1,backgroundColor: "#ecf3f0" }}>
      //             <Grid container wrap="nowrap" spacing={40}>
      //               <Grid item>
      //                 <Avatar style={{ backgroundColor: deepOrange[500], margin: 10 }}>A</Avatar>
      //               </Grid>
      //               <Grid item xs>
      //                 <Typography>
      //                   <Row>
      //                     <Col xs="8">
      //                       <h4>  {qtitle}</h4>
      //                     </Col>
      //                     <Col xs="4">
      //                       <Button color="primary" variant="contained" onClick={() => handleClick(isVisible, qid).bind(this)} >On/Off</Button>                    
      //                       {isVisible}
      //                     </Col>
      //                   </Row>
      //                   <h6>{qdescription}</h6>
      //                  {/* <h4> {questionOptions.map((element)=>(element.optionvalue))}</h4> */}
      //                 <Row style={{marginTop:"30px"}}>
      //                   <Col xs="4">
      //                   <span style={{fontWeight:"bolder"}}>Options Provided For Users</span>
      //                   </Col>
      //                   <Col xs="8">
      //                  {questionOptions.map((element)=>
      //                   // (element.optionvalue)

      //                     <label className="radio-inline" style={{marginLeft:"30px"}}>
      //                   <input type="radio" name="optradio" disabled={true}/>
      //                   {element.optionvalue}
      //                   </label>               
      //                   )}
      //                   </Col>
      //                   </Row>
      //                   {/* <h4>{questionOptions[0].optionvalue}</h4> */}
      //                 </Typography>
      //               </Grid>
      //             </Grid>
      //             <Row>
      //               <Col xs="4">
      //                 <p style={{ fontWeight: "bold" }}>Posted on:</p>
      //                 <p> {dateFormat(date_time, "fullDate")}</p>
      //               </Col>
      //             </Row>
      //             {/* <Row>
      //             <label class="switch">
      //   <input type="checkbox"/>
      //   <span class="slider"></span>
      // </label>
      //               </Row> */}
      //           </Paper>
      //         </Col>
      //       </Row>
      // ------------------------------------------------------------------------------------------------
      <div style={{ marginTop: "30px" }}>
        <Row>
          <Col xs="12" sm="12" md="8">
            <Card >
              <CardHeader className="cardAdminHeader">
                <Row>
                  <Col xs="3" sm="3" md="1">
                    <Avatar style={{ backgroundColor: deepOrange[500] }}>A</Avatar>
                  </Col>
                  <Col xs="8" sm="8" md="9" style={{marginTop:"5px"}}>
                    <h5 className="qtitleSize">{qtitle}</h5>
                  </Col>
                  {/* <Col xs="3" sm="3" md="3" >
                    <Button style={{  backgroundColor:"#567bbb" }}  onClick={() => handleClick(isVisible, qid).bind(this)} >On/Off</Button>
                    {isVisible}
                  </Col> */}

                  {/* <span >
                  <Button style={{  backgroundColor:"#567bbb"}}  onClick={() => handleClick(isVisible, qid).bind(this)} >On/Off</Button>
                    {isVisible}
                    </span> */}
                  {/* <span style={{alignItems:"right"}}>
                  <Button style={{  backgroundColor:"#567bbb" }}  onClick={() => handleClick(isVisible, qid).bind(this)} >On/Off</Button>
                    </span> */}
                </Row>
              </CardHeader>
              <CardBody>
                <CardText>
                  <Row>
                    <Col className="col-12">
                      <h6>{qdescription}</h6>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "30px" }}>
                    <Col className="col-12">
                      <span style={{ fontWeight: "bold" }}>Options Provided For Users</span>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "10px" }}>
                    <Col className="col-12">
                      {questionOptions.map((element) =>
                        // (element.optionvalue)                  
                        <label className="radio-inline" style={{ marginRight: "20px" }} >
                          <input type="radio" name="optradio" disabled={true} />
                          {element.optionvalue}
                        </label>
                      )}
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    <Col className="col-12">
                      <span style={{ fontWeight: "bolder" }}>Posted On:</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-12">
                      <span>{dateFormat(date_time, "fullDate")}</span>
                    </Col>
                  </Row>
                </CardText>
              </CardBody>
              <CardFooter>
                <Row>
                  <Col className="col-8">
                    <h6>Result</h6>
                    <Button size="sm" className="btnAdmin">Enable/Disable</Button>
                  </Col>
                  <Col className="col-4" style={{ float: "right" }}>
                    <span><h6>Question</h6>
                      <Button size="sm" className="btnAdmin" onClick={() => handleClick(isVisible, qid).bind(this)} >
                        {isVisible ? 'Off' : 'On'}
                      </Button></span>
                    {isVisible}
                  </Col>
                </Row>
              </CardFooter>
              <CardFooter>
                <ExpansionPanel style={{ width: "100%" }}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography > Click Here to View Resut</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      {/* {votes.map((element) => (qid == element.qid) ? element.optionvalue + '=' + ' ' + (element.total_votes) + ' \r\n' : null)} */}
                      < div className="chart" style={{ widows: "100%" }} >
                      {/* <Button style={{marginBottom:"20px"}} onClick={this.refreshOnClick}>Refresh</Button> */}
                          <Chart getProducts={this.getProducts} getVoteCount={this.getVoteCount} data={votes} qData={qid} />

                        </div>
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
  render() {
    const { classes } = this.props;
    const { products, product } = this.state;
    const { optionValue, options } = this.state;
    return (
      <div className="backgrndaadmin">
      <Container  >
        <div className="App">
          <h3 className="postQuestion" style={{marginTop:"20px"}}>Post Your Question</h3>
          <Row>
            <Col xs="6">
              <TextField
                id="full-width"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Question Title"
                fullWidth
                margin="normal"
                value={product.qtitle}
                onChange={e => this.setState({ product: { ...product, qtitle: e.target.value } })}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <TextField
                required
                id="full-width"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Type your Question Here"
                fullWidth
                margin="normal"
                value={product.qdescription}
                onChange={e => this.setState({ product: { ...product, qdescription: e.target.value } })}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" style={{ textAlign: "left" }}>
              <label>How many options you want?</label>
            </Col>
          </Row>
          <Row>
            <Col xs="6" style={{ textAlign: "left" }}>
              <select value={this.state.selectValue}
                onChange={this.handleSelectedValue} className="form-control" >
                <option value={1}>1 (One)</option>
                <option value={2}>2 (Two)</option>
                <option value={3}>3 (Three)</option>
                <option value={4}>4 (Four)</option>
                <option value={5}>5 (Five)</option>
              </select>
            </Col>
            <br /><br />
            <div style={{ display: 'block' }}>
              {this.state.options.map((element) =>
                <div style={{ clear: 'both', marginLeft: "5px" }}>Option {element.id + 1} : <input type="text"
                  name={this.state.values[element.id]}
                  onChange={this.handleChange.bind(this, element.id)}
                  //  onChange={this.handleChange.bind(this)}
                  required />  <br /><br />
                  {/* <button onClick={this.addOption}>Add</button> */}
                </div>
              )}
            </div>
            {/* <input type="text" value={this.state.optionValue} onChange={this.handleChange}/> */}
          </Row>
          <Row>
            <Col xs="6" style={{ textAlign: "left", marginTop: "16px" }} >
              <Button onClick={this.addProduct} size="large" variant="contained" className="btnAdmin">Post Question</Button>
              {/* <Button onClick={this.handleToogle}>Click</Button> */}

              {/* {this.state.votes.map((element)=>element)} */}
            </Col>
          </Row>
        </div>
        {products.map(this.renderProduct)}

      </Container>
      </div>
    );
  }
}
AdminPostQuestion.propTypes = {
  classes: PropTypes.object.isRequired,
};
// export default AdminPostQuestion;
export default withStyles(styles)(AdminPostQuestion);