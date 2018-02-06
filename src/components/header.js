import React, { Component, PropTypes } from 'react';
import { Button,FormGroup,Form,Col,ControlLabel,FormControl,InputGroup,Glyphicon,Row,Grid,Table,tbody,tr,td,Alert} from 'react-bootstrap';

import {isLoggedin} from '../utils/constants';
import { Redirect } from 'react-router'
export default class Header extends React.Component {
constructor(props) {    
      super(props);
      this.logout = this.logout.bind(this);
     
    }
logout()
{
  
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('name');
  sessionStorage.removeItem('nc');
  window.location.reload();
}
render(){

       return(
           <div className="header">
           <h1 className="heading-text">{this.props.heading}</h1>
            <p className="logout-text" onClick={this.logout}>Logout</p>
            </div> 
        )
     }
}

