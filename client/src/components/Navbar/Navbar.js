import React, { useState, useEffect} from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button} from '@material-ui/core';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import monster from '../../images/clock.jpg';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import decode from "jwt-decode";

const Navbar = () => {
    const classes = useStyles();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch= useDispatch();
    const history = useNavigate();
    const location =useLocation();
    const logout = () => {
      dispatch({type: 'LOGOUT'});
      history('/auth')
      setUser(null);
     
    }
    useEffect(()=>{
      const token = user?.token;
      if(token){
        const decodedToken = decode(token);

        if (decodedToken.exp * 1000 < new Date().getTime()) {
          logout();
        }
      }
      setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
    return (
        
        <AppBar className={classes.appBar} position="static" color="inherit">
           <div className={classes.brandContainer}>
           <img className={classes.image} src={monster} alt="monster" height="60" />
        <Typography component={Link} to="/" className={classes.heading} variant="h4" align="center">  Дні нашого життя</Typography>
        
            </div>
            <Toolbar className={classes.toolbar}>
        {user? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Вийти</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Увійти</Button>
        )}
      </Toolbar>
</AppBar>
    );
};
export default Navbar;