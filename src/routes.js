import React from 'react'
import { Router, Route,browserHistory, IndexRoute} from 'react-router'
import Login from './components/login';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
//import Dashboard from './components/dashboard';
//const hash = require('./utils/hash.js');


export const routes = (
  <div>
    
    <Route path='/'  component={Login} />
   
   </div>
);
export default class AppRoutes extends React.Component {
  render() {
    return (
      <Router routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    );
  }
}