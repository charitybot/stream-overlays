import * as React from 'react';
import { observer, Provider } from 'mobx-react';

import RootStore from '../../common/stores/RootStore';

import Total from './Total';

interface IMainProps {}

@observer
export default class Main extends React.Component<IMainProps> {
  private eventIdentifier: string = 'test';

  constructor(props: any) {
    super(props);
    // Parse the query parameters present
    const params: URLSearchParams = new URLSearchParams(props.location.search);
    const parsedIdentifier: string | null = params.get('event');
    this.eventIdentifier = parsedIdentifier ? parsedIdentifier : 'test';
  }

  public render() {
    return (
      <Provider rootStore={new RootStore()}>
        <Total eventIdentifier={this.eventIdentifier} />
      </Provider>
    );
  }
}
