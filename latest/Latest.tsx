import * as React from 'react';
import { observer, inject } from 'mobx-react';

import DonationStore from '../common/stores/DonationStore';
import Donation from '../common/models/Donation';

const REQUEST_DELAY: number = 2000;

interface ILatestProps {
  eventIdentifier: string;
}

@inject('rootStore')
@observer
export default class Latest extends React.Component<ILatestProps> {
  private donationStore: DonationStore;
  private requestLoop: NodeJS.Timer | null;
  private oldTotal: number = 0;

  constructor(props: any) {
    super(props);
    this.donationStore = props.rootStore.donationStore;
  }

  public componentDidMount() {
    console.log(`Mounting Latest Overlay for Event with Identifier: ${this.props.eventIdentifier}`);
    this.updateLatestDonation();
    this.requestLoop = setInterval(() => {
      this.updateLatestDonation();
    }, REQUEST_DELAY);
  }

  public render() {
    const oldTotal: number = this.oldTotal;
    let newTotal: number = this.donationStore.getTotal();
    // Make sure it never counts down
    if (newTotal >= oldTotal) {
      this.oldTotal = newTotal;
    } else {
      newTotal = oldTotal;
    }
    // TODO: Add currency prefix?
    return <span id="latest-donation">TODO</span>;
  }

  private updateLatestDonation(): Promise<Donation | void> {
    // TODO
    return Promise.resolve().catch(error => console.error(error));
  }

  public componentWillUnmount() {
    clearInterval(this.requestLoop);
    this.requestLoop = null;
  }
}
