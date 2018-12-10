import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './styles/style.sass';

import Main from './Total/Main';

console.log('CharityBot overlay starting...');

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={Main} />
  </BrowserRouter>,
  document.querySelector('#overlay')
);
