import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import routes from './routes';
import {
    Router,
    hashHistory
} from 'react-router';
// import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDom.render((
    <Router 
       routes={routes} 
       history={hashHistory}
    />
), document.getElementById('app'));