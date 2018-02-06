import React, { Component, PropTypes } from 'react';
import {CreateNewsApi} from '../api/api'
import { Button,FormGroup,Form,Col,ControlLabel,FormControl} from 'react-bootstrap';
//const hash = require('../utils/hash.js');
import openSocket from 'socket.io-client';
import {isLoggedin} from '../utils/constants'
import Header from './header';
const socket = openSocket('http://localhost:3001');


class NewsInput extends React.Component {
			constructor(props) {    
		    super(props);
		    this.createNews = this.createNews.bind(this)
		  }

	      createNews()
	      {
	      	var title = this.refs.title.value;
    		var content = this.refs.content.value;
	      	CreateNewsApi(title,content)
    			.then((response) =>  {
    				if(response.status=='success')
    				{
    					socket.emit('client event', { value: title });
    					this.refs.title.value ='';
    					this.refs.content.value = '';
    				}
    			}
		     )
		    .catch((error) => {
		       console.log(error)
		      this.setState({msg:"Something went wrong!!!"})
		      

		    })
	      	 
	        
	      }
	      render(){
	      	var ButtonCss = "primary";
            var ButtonText = "Create News";
	        return (
	          <div className="update-label">
	          
	           <Form horizontal>
            
		            <FormGroup controlId="formHorizontalEmail">
		              <Col componentClass={ControlLabel} sm={2}>
		                Tittle
		              </Col>
		              <Col sm={10}>
		                <input className="form-control" type="title" placeholder="Title" name="title" ref="title" />
		              </Col>
		            </FormGroup>

		            <FormGroup controlId="formHorizontalPassword">
		              <Col componentClass={ControlLabel} sm={2}>
		                Content
		              </Col>
		              <Col sm={10}>
		              <textarea className="form-control" rows="5" id="comment" placeholder="Content" name="content" ref="content"></textarea>
		      
		              </Col>
		            </FormGroup>
		           
		            

		            <FormGroup>
		              <Col smOffset={2} sm={10}>
		                <Button bsStyle={ButtonCss} onClick={this.createNews}>{ButtonText}</Button>
		              </Col>
		            </FormGroup>
		          </Form>
	           
	          </div>
	        );
	      }
}

export default class CreateNews extends React.Component {
	constructor(props) {    
    super(props);
    
  	}
	componentDidMount(){
	 
	  const { history } = this.props;
	   if(!isLoggedin()){history.push('/')}
	}
    render(){
    	var mainClass = "App";

	   
       return(
       		<div>
       		<Header heading="Create News"/>
            <div className={mainClass}>
            
           		<NewsInput/>
           		
           </div>  
           </div> 
        )
     }
}

