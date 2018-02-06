import React, { Component, PropTypes } from 'react';
import {LoginApi} from '../api/api'
import { Button,FormGroup,Form,Col,ControlLabel,FormControl} from 'react-bootstrap';
import {isLoggedin} from '../utils/constants'
//const hash = require('../utils/hash.js');

export default class Login extends React.Component {
  constructor(props) {    
    super(props);

    this.state = {
      loginstatus:false,
      errormsg:0,
      msg:''
    }
  }
  componentDidMount(){
   const { history } = this.props;
   if(isLoggedin()){history.push('/dashboard')}
  }
  login(nextState,replace){
    const { history } = this.props;
    var username = this.refs.uname.value;
    var password = this.refs.pwd.value;
    LoginApi(username,password)
    .then((response) =>  {
 
       if(response.status=='success' && response.data.length>=1)
       {
         sessionStorage.setItem('token',response.token);
         sessionStorage.setItem('name',response.data[0].username);
         sessionStorage.setItem('nc',0);
         history.push('/dashboard')
       }
       else
       {
          this.setState({msg:"Username Or Password is wrong!!!"})
       }
      }
     )
    .catch((error) => {
       console.log(error)
      this.setState({msg:"Something went wrong!!!"})
      

    })
  }
  render(){
    var loginButton = "primary";
    var loginText = "Login";
    // socket.on('update label', function (data) {
    //        alert(JSON.stringify(data))
    //     });
     return(
         <div className="App">
          <Form horizontal>
            
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <input className="form-control" type="email" placeholder="Username" name="uname" ref="uname" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <input className="form-control"  type="password" placeholder="Password" name="pwd" ref="pwd"/>
              </Col>
            </FormGroup>
            <p className="redText">{this.state.msg}</p>
            

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button bsStyle={loginButton} onClick={this.login.bind(this)}>{loginText}</Button>
              </Col>
            </FormGroup>
          </Form>
          
         
          
        </div> 
      )
   }
}


