import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Router, Route, browserHistory} from 'react-router';

import Signup from '../ui/Singup';
import Dashboard from '../ui/Dashboard';
import NotFound from "../ui/NotFound";
import Login from "../ui/Login";

window.browserHistory = browserHistory;


const unauthenicatePage = ['/', '/signup'];
const authenicatePage = ['/dashboard'];
const onEnterPublicPage = () => {
  if(Meteor.userId()) {
    browserHistory.push('/dashboard');
  }
};

const onEnterPrivatePage = () => {
  if(!Meteor.userId()){
    browserHistory.push('/signup');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathName = browserHistory.getCurrentLocation().pathname;
  const isUnanthenicatedPage = unauthenicatePage.includes(pathName);
  const isAuthenicatedPage = authenicatePage.includes(pathName);

  if(isUnanthenicatedPage && isAuthenticated) {
    browserHistory.push('/dashboard');
  } else if (isAuthenicatedPage && !isAuthenticated) {
    browserHistory.push('/');
  }

  console.log('isAuthenticated = ' + isAuthenticated);
};


export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage()}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage()}/>
    <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage()}/>
    <Route path="*" component={NotFound}/>
  </Router>
);
