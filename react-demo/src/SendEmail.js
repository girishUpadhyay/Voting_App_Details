import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText,Container,Row,Col} from 'reactstrap';
import axios from 'axios'
class SendEmail extends React.Component {

    constructor(){
        super();
        this.state={
            name:'',
            email:'',
            message:''
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
   handleChange=e=>{
       this.setState({[e.target.name]:e.target.value})
   }
   
   async handleSubmit(e)
   {
    // alert("Successfully Sent the mail")

       e.preventDefault();
       const {name,email,message}=this.state;
       const form=await axios.post('/api/form',{
           name,
           email,
           message
       })
       

      
   }
    render() {

        return (
            <Container>
            <Form onSubmit={this.handleSubmit} style={{width:"600px"}}>
            <h4>Share your feedback with us </h4>
            <hr/>
            <Row>
                <Col md="12" sm="12">
                <FormGroup>
                    <Label for="name">Name:</Label>
                    <Input type="text" name="name" onChange={this.handleChange} required />
                </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col md="12" sm="12">
                <FormGroup>
                    <Label for="email">Email:</Label>
                    <Input type="email" name="email" onChange={this.handleChange} required />
                </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col md="12" sm="12">
                <FormGroup>
                    <Label for="message">Message:</Label>
                    <Input type="textarea" name="message" onChange={this.handleChange} required />
                </FormGroup>
                </Col>
                </Row>
                <Button>Submit</Button>
            </Form>
            </Container>
        )
    }
}
export default SendEmail;