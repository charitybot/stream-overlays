import * as React from 'react';
import { Provider } from 'mobx-react';
import * as ReactDOM from 'react-dom';

import Total from './Total/Total';

import RootStore from '../../common/stores/RootStore';

ReactDOM.render(
  <Provider rootStore={new RootStore()}>
    <Total />
  </Provider>,
  document.querySelector('#overlay')
);
