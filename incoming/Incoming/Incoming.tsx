import * as React from 'react';
import { observer } from 'mobx-react';

import Donation from '../../common/models/Donation';

const REQUEST_DELAY: number = 2000;

interface IIncomingProps {
  eventIdentifier: string;
  debug: boolean;
}

@observer
export default class Incoming extends React.Component<IIncomingProps> {
  private requestLoop: NodeJS.Timer | null;

  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    console.log(`Mounting Incoming Overlay for Event with Identifier: ${this.props.eventIdentifier}`);
    this.requestLoop = setInterval(() => {
      this.getIncomingDonations().then((donations: Donation[]) => {
        console.log(donations);
      });
    }, REQUEST_DELAY);
  }

  public render() {
    return <span id="incoming-donations">TODO</span>;
  }

  private getIncomingDonations(): Promise<Donation[] | void> {
    return Promise.resolve([]).catch(error => console.error(error));
  }

  public componentWillUnmount() {
    clearInterval(this.requestLoop);
    this.requestLoop = null;
  }
}
