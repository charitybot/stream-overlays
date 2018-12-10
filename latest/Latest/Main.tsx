import * as React from 'react';
import { observer } from 'mobx-react';

import Latest from './Latest';

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
    return <Latest eventIdentifier={this.eventIdentifier} debug={this.debugMode} />;
  }
}
