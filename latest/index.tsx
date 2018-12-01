import * as React from 'react';
import { Provider } from 'mobx-react';
import * as ReactDOM from 'react-dom';

import './styles/style.sass';

import Latest from './Latest';

import RootStore from '../common/stores/RootStore';

// Reset the available event identifer
let parsedEventIdentifier: string = window['eventIdentifier'] ? window['eventIdentifier'] : 'test';
if (parsedEventIdentifier === '{{ eventIdentifier }}') {
  parsedEventIdentifier = 'test';
}

ReactDOM.render(
  <Provider rootStore={new RootStore()}>
    <Latest eventIdentifier={parsedEventIdentifier} />
  </Provider>,
  document.querySelector('#overlay')
);
