import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import AdminPostQuestion from './AdminDetails/AdminPostQuesstion'
import WelcomeUser from './UserData/WelcomeUser'
class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      isVisible:'Giiisshhshs'
    }
  }
  handleVisibility=()=>{
    // this.setState({isVisible:!prevState.isVisible})
    this.setState({isVisible:'gsggsgsgsgsg'})


  }

  render(){
    return(
      <div>
    <AdminPostQuestion isVisible={this.state.isVisible}
      handleVisibility={this.handleVisibility} />

<WelcomeUser isVisible={this.state.isVisible} />
</div>
)
    
  }
}
// import { BrowserRouter, Route, Link,Switch,NavLink } from "react-router-dom";
// import { Redirect } from 'react-router-dom'

// function Display()
// {
//   return <h2>Display Component</h2>
// }

// class App extends Component {
//  state={                                     // setting the state of the products
//     products:[],
//     product:{
//       name:'',
//       address:''
//     }
//   }
//   componentDidMount()                       
//   {
//     this.getProducts();
//   }

//   getProducts=_=>{

//     fetch('http://localhost:4000/products')
//     .then(response=>response.json())
//     .then(response=>this.setState({products:response.data}))
//     .catch(err=>console.error(err))
    
//   }
  
//   // check(){

//   //   if(this.state.products.name=='Company Inc')
//   //   return(<p>Name is Company Inc</p>)
//   //   else
//   //   return (<p>The name is different</p>)
//   // }



//   // addProduct=_=>{

//   //   const product=this.state;
    
//   //   console.log(JSON.stringify(product.product.name))
//   //   fetch('http://localhost:4000/products/add?name='+product.product.name+'&address='+product.product.address)
//   //   // .then(response=>response.json())
//   //   .then(this.getProducts)
//   //   .catch(err=>console.error(err))

//   // }

//   renderProduct=({product_id,name,address})=>
//   <div key={product_id}>{address}</div>
// // {
// //  if(address=='aaa')
// //  return <p>{address}</p>  
 
// // }
  
  


//   render() {
//     const {products,product}=this.state;

//     return (

      
//       <div className="App">
//       {products.map(this.renderProduct)}

      
        
//         <div>
// <input 
// value={product.name}
//  onChange={e=>this.setState({product:{ ...product, name:e.target.value}})}/>
// <input
//  value={product.address}
//  onChange={e=>this.setState({product:{ ...product, address:e.target.value}})}
//  />

//  <button onClick={this.addProduct}>addProduct</button>


//         </div>
//       </div>
//     );
//   }
// }

export default App;
