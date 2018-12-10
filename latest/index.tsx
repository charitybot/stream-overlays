import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './styles/style.sass';

import Main from './Latest/Main';

ReactDOM.render(
  <BrowserRouter>
    <Route exact={true} path="/" component={Main} />
  </BrowserRouter>,
  document.querySelector('#overlay')
);
