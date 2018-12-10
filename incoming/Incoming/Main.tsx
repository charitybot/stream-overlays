import * as React from 'react';
import { observer } from 'mobx-react';

import Incoming from './Incoming';

interface IMainProps {}

@observer
export default class Main extends React.Component<IMainProps> {
  private eventIdentifier: string = 'test';
  private debugMode: boolean = false;

  constructor(props: any) {
    super(props);
    // Parse the query parameters present
    const params: URLSearchParams = new URLSearchParams(props.location.search);
    const parsedIdentifier: string | null = params.get('event');
    this.eventIdentifier = parsedIdentifier ? parsedIdentifier : 'test';
    const parsedDebug: string | null = params.get('debug');
    this.debugMode = parsedDebug !== null ? true : false;
  }

  public render() {
    return <Incoming eventIdentifier={this.eventIdentifier} debug={this.debugMode} />;
  }
}
