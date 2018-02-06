import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import CreateNews from './components/createnews';
import MyNews from './components/mynews';
import ReadNews from './components/readnews';

ReactDOM.render(<Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/createnews" component={CreateNews} />
        <Route path="/mynews" component={MyNews}/>
        <Route path="/readnews" component={ReadNews}/>
      </div>
  </Router>, document.getElementById('root'));

