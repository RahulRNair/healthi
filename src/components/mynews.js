import React, { Component, PropTypes } from 'react';
import {MyNewsApi} from '../api/api'
import { Button,FormGroup,Form,Col,ControlLabel,FormControl,Alert} from 'react-bootstrap';
//const hash = require('../utils/hash.js');
import {isLoggedin} from '../utils/constants'
import Header from './header';
export default class MyNews extends React.Component {
	constructor(props) {    
	    super(props);
	    this.state = {
	      news:'',

	    };
	    
    
  	}
	componentDidMount(){
		const { history } = this.props;
	   	if(!isLoggedin()){history.push('/')}
		MyNewsApi()
    			.then((response) =>  {
    				if(response.status=='success')
    				{
    					this.setState({news:response.data})
    				}
    			}
		     )
		    .catch((error) => {
		       console.log(error)
		      this.setState({msg:"Something went wrong!!!"})
		      

		    })
	  
	}
    render(){
    	var NewsData = '';
    	if(this.state.news.length>0)
    	{
	    	NewsData = this.state.news.map((data) => {

		     return(
		      <Alert bsStyle="warning">
		      	<p><b>{data.title}</b></p>
		      	<p>{data.content}</p>
		      </Alert>
		     
		       )
		    });
    	}
    	var mainClass = "App_MyNews";

	   
       return(
       		<div>
       		<Header heading="My News"/>
            <div className={mainClass}>
            
            {NewsData}
            </div> 
            </div>  
        )
     }
}

