import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, browserHistory } from 'react-router-dom';
import App from './components/App.jsx';

ReactDOM.render(<BrowserRouter history={ browserHistory }><App /></BrowserRouter>, document.getElementById('app'));