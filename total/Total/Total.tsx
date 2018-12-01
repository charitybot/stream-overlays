import * as React from 'react';
import { observer, inject } from 'mobx-react';

import * as CountUp from 'react-countup';

import DonationStore from '../../common/stores/DonationStore';

const REQUEST_DELAY: number = 2000;

interface ITotalProps {
  eventIdentifier: string;
}

@inject('rootStore')
@observer
export default class Total extends React.Component<ITotalProps> {
  private donationStore: DonationStore;
  private totalRequestLoop: number | null;
  private oldTotal: number = 0;

  constructor(props: any) {
    super(props);
    this.donationStore = props.rootStore.donationStore;
  }

  public componentDidMount() {
    this.updateEventTotal();
    this.totalRequestLoop = setInterval(() => {
      this.updateEventTotal();
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
    return (
      <span id="total-amount">
        <CountUp start={oldTotal} end={newTotal} decimals={2} prefix="" separator="," />
      </span>
    );
  }

  private updateEventTotal(): Promise<number> {
    return this.donationStore.fetchEventTotal(this.props.eventIdentifier);
  }

  public componentWillUnmount() {
    clearInterval(this.totalRequestLoop);
    this.totalRequestLoop = null;
  }
}
