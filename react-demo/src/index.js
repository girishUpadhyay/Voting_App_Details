import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Login from './Components/Login'
import LoginDetails from './Components/LoginDetails'
import registerServiceWorker from './registerServiceWorker';
import RoutingEx from './Components/Router'
import Appbar from './AdminDetails/AdminLogin'
import Prac from './Components/prac'
import GmailLogin from './LoginData/GmailLogin'
import WelcomeUser from './UserData/WelcomeUser'
import LoginWelcome from './LoginData/LoginWelcome'
import Home from './Components/Home'
import SendEmail from './SendEmail';
import AlertDialogSlide from './UserData/Dialog';
//import AuthExamples from './LoginData/AuthExample'
import AuthExample from './LoginData/AuthExample'
import Logins from './LoginData/Logins'
import Chart  from './Components/Chart'
ReactDOM.render(<AuthExample/>, document.getElementById('root'));
//ReactDOM.render(<RoutingEx />, document.getElementById('root'));
registerServiceWorker();
