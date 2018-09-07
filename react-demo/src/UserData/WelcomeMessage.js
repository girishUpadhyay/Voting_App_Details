import React from 'react';
import ReactDOM from 'react-dom';
import '../responsivenessUser.css'
import {
    Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Button, Container, Row, Col
  } from 'reactstrap';

class WelcomeMessage extends React.Component{

    render(){

        return(
            <div>
                <Container>
                    <Row style={{marginTop:"30px", color:"#f88a00"}}>
                        <h5 className="welcomemessage">&nbsp;&nbsp;Please Vote and Share Your Valuable Feedback</h5>
                        </Row>
                    </Container>
                </div>


        )
    }
}

export default WelcomeMessage;
