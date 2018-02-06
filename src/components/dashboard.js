import React, { Component, PropTypes } from 'react';
import { Button,FormGroup,Form,Col,ControlLabel,FormControl,InputGroup,Glyphicon,Row,Grid,Table,tbody,tr,td,Alert} from 'react-bootstrap';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');
import {isLoggedin} from '../utils/constants'
import Header from './header';


export default class Dashboard extends React.Component {

constructor(props) {    
    super(props);
    this.state = {
      cnt:parseInt(sessionStorage.getItem('nc')),

    };
    this.handleData = this.handleData.bind(this);
    this.MarkAsRead = this.MarkAsRead.bind(this);
    
  }
componentDidMount(){
  const { history } = this.props;
   if(!isLoggedin()){history.push('/')}
  socket.on('update label', this.handleData) 
  
}
handleData(data){
  var Count = parseInt(sessionStorage.getItem('nc'));
  sessionStorage.setItem('nc',Count+1);
  this.setState({cnt:Count+1})
}
MarkAsRead()
{
  const { history } = this.props;
  this.setState({cnt:0})
  sessionStorage.setItem('nc',0);
  history.push('/readnews')
}

render(){
      var SearchClass = "App";
      var rowClass = "btn-warning"
      var Pagination = '';
      var TableData =  'No Result Found!!!';
      var UserName = sessionStorage.getItem('name');
      var notifyClass = "notification notify";
      var Count = this.state.cnt;
      var ButtonCss = "btn btn-primary";
      var ButtonText = "Add News";
    
      if(this.state.cnt>0)
      {
        notifyClass = "notification notify show-count";
      }
      
       return(
          <div>
          <Header heading="Dashboard"/>
           <div className={SearchClass}>
             
            <h1>Welcome {UserName}</h1>
            
            <div className="container" onClick={this.MarkAsRead}>
                 <div className={notifyClass} data-count={Count}>
                 <span className="glyphicon glyphicon-bell"></span>
                 </div>
                  
              </div>
           
            
            <a className={ButtonCss} href="/mynews" target="_blank" style={{'marginRight':'10px'}}>My News</a>
            <a className={ButtonCss} href="/createnews" target="_blank">{ButtonText}</a>
           
         
            </div> 
            </div>
        )
     }
}

