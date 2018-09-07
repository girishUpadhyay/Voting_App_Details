import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, NavLink } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
// import {Link} from "react-router-dom";


function Action(){
    return(

        <h3>The Action Method will be called</h3>
    )
}


class Login extends React.Component {
    // state={

    // }
    constructor(props) {
        super(props)
        this.state = {                                     // setting the state of the products
            users: [],
            name: 'admin',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        // this.renderUser=this.renderUser.bind(this);
        this.check = this.check.bind(this);
        // this.handleLogin = this.handleLogin.bind(this)
        // this.onButtonClick=this.onButtonClick.bind(this);
    }

    // handleLogin(event) {
    //     // event.preventDefault()
    //     // do some login logic here, and if successful:
    //     this.props.history.push(`/afterlogin`)
    //   }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            [e.target.password]: e.target.value
        })
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts = _ => {

        fetch('http://localhost:4000/login')
            .then(response => response.json())
            .then(response => this.setState({ users: response.data }))
            .catch(err => console.error(err))

    }

    //   renderUser=({product_id,username,passwords})=>
    // // //  <div>
    // // //   <div key={product_id}>User Name:{username}</div>
    // // //   <div key={product_id}>Password:{passwords}</div>
    // // //   </div>
    //   {
    //     if(this.state.name==username){
    //        alert("Successfully logged in:")

    //     }
    //     else
    //     {
    //         alert("Invalid credentials")
    //     }
    // }


    check() {
        const { users } = this.state;
        var i=users.length;
        for(var j=0;j<i;j++)
        {
             if(this.state.name==users[j].username && users[j].username=='admin'){
            // alert('ADMIN ! Dude you have logged in');
            this.props.history.push(`/afterlogin`);
            break;
          
        }
        else if(this.state.name==users[j].username && users[j].username=='root')
         {

            // alert('Root has successfully logged in')
          alert('Root customer logged in')
            break;
         }
        }
     

        // if (this.state.name == username) {
        //     alert('Hello')
        // }
        // else {
        //     alert('World')

        // }
        //  console.log(users[0].username)
        // if(this.state.name==users[0].username){
        //     alert('Logging is possible')
        // }
        // else
        // alert("Logging is not possible")
    }

    //   return(
    // <div>
    //    <div key={product_id}>User Name:{username}</div>
    //    <div key={product_id}>Password:{passwords}</div>
    //   </div>
    //   )


    //   onButtonClick(e)
    //   {
    //       if(this.state.name=='admin')
    //       alert('Logged in')
    //       else
    //       alert('Login failed')

    //   }

    render() {
        const { users } = this.state;
        return (


            <div className="App">
                {/* {users.map(this.renderUser)} */}

               {/* ? {users.map(this.check)} */}
               {/* {this.check} */}
                <div>
                    <label>Username:</label>
                    <input type="text" name='name' value={this.state.name} onChange={this.handleChange} />
                    <label>Password</label>
                    <input type="text" name='password' value={this.state.password} onChange={this.handleChange} />
                
                    {/* <input type="button" value="Login" onClick={this.check} /> */}
                    <button className="btn btn-primary"onClick={this.check} >Go Home</button>

                </div>
            </div>
        );
    }



}

export default Login;