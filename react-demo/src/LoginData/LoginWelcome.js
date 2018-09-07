import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'reactstrap';
import backgroundimage from '../Images/dylan-gillis-533818-unsplash.jpg';
import '../index.css';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import GmailLogin from './GmailLogin';
import candelalogo from '../Images/candelalogo.png'


const styles = theme => ({
    backgroundstyle:{
        backgroundImage: `url(${backgroundimage})`,
        flex: 1,
        // resizeMode: 'cover',
        // width:null,
        // height:null,     
    },
    containerstyle:{
height:'100%'
    }
  });
class LoginWelcome extends React.Component{

    render()
    {
        const { classes } = this.props;
        return(
            
            <Grid style={{minHeight:1000,backgroundRepeat:'no-repeat',backgroundSize:'cover'}} className={classes.backgroundstyle} responsive>
            <div className="center_div">
            <center>
                <Row>
                    <Col xs="8" style={{padding:"174px", marginLeft:"286px",marginTop:"136px"}}>
                    <label style={{color:"rgb(119, 73, 154)"}}><h5>Candela Labs</h5></label>
                   <Row> <img src={candelalogo} style={{padding:"14px",marginLeft:"168px"}}/></Row>
                        <input type="text" className="form-control">

                        </input>
                        <Row>Hello How are you?</Row>
                        <GmailLogin/>
                        
                    </Col>
                    </Row>
                </center>
        
            </div>
         </Grid>
        )
    }


}
LoginWelcome.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  // export default AdminPostQuestion;
  export default withStyles(styles)(LoginWelcome);