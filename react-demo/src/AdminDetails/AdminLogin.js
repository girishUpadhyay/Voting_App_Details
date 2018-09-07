// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import Paper from '@material-ui/core/Paper';
// import Avatar from '@material-ui/core/Avatar';
// import deepOrange from '@material-ui/core/colors/deepOrange';
// import classNames from 'classnames';
// import {AuthButton} from '../LoginData/AuthExample'
// import AdminPostQuestion from '../AdminDetails/AdminPostQuesstion';
// import GmailLogin from '../LoginData/GmailLogin';
// import '../responsivenessUser.css'

// const styles = {
//   root: {
//     flexGrow: 1,
//   },
//   flex: {
//     flex: 1,
//   },
//   orangeAvatar: {
//     margin: 5,
//     color: '#fff',
//     backgroundColor: deepOrange[500],
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },  
// };

// function ButtonAppBar(props) {
//   const { classes } = props;
//   return (
//       <Paper>
//     <div className={classes.root}>
//       <AppBar position="static" style={{flexGrow:1,backgroundColor:"#ebedee",color:"black"}}>
//         <Toolbar>
//           <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
//           <Avatar className={classes.orangeAvatar}>A</Avatar>
//           </IconButton>
//           <Typography variant="title" color="inherit" className={classes.flex}>
//          <span className="welcomemessage">Welcome Admin</span>
//           </Typography>
//         <Button>  <AuthButton /></Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//     <AdminPostQuestion/>
//     </Paper>
//   );
// }
// ButtonAppBar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
// export default withStyles(styles)(ButtonAppBar);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import AdminPostQuestion from '../AdminDetails/AdminPostQuesstion';
import GmailLogin from '../LoginData/GmailLogin';
import {AuthButton} from '../LoginData/AuthExample'
import '../responsivenessUser.css'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    val: []
  };
  componentDidMount() {
    this.getUsers();
  }

  getUsers = _ => {
    debugger

    fetch('http://localhost:4000/users')
      .then(response => response.json()
        .then(response => this.setState({ val: response.data }))
      )
      .catch(err => console.error(err))
  }
  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl,val } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
       <Paper> 
      <div className={classes.root}>
        <AppBar position="static" style={{flexGrow:1,backgroundColor:"#ebedee",color:"black"}}>
          <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <Avatar alt="Remy Sharp" src={val.Paa} className={classes.avatar} />
           </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <span className="welcomemessage">Welcome {val.ig}</span>
            </Typography>
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
                  id="menu-appbar"
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
                  <MenuItem onClick={this.handleClose}><AuthButton/></MenuItem>
                  {/* <MenuItem onClick={this.handleClose}>My account</MenuItem> */}
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <AdminPostQuestion/>
      </Paper>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);