import * as React from 'react';
import { observer, inject } from 'mobx-react';
import DonationStore from '../../../common/stores/DonationStore';

const REQUEST_DELAY: number = 2000;

interface ITotalProps {
  eventIdentifier: string;
}

@inject('rootStore')
@observer
export default class Total extends React.Component<ITotalProps> {
  private donationStore: DonationStore;
  private totalRequestLoop: number | null;

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
    return <span>{this.donationStore.getTotal()}</span>;
  }

  private updateEventTotal(): Promise<number> {
    return this.donationStore.fetchEventTotal(this.props.eventIdentifier);
  }

  public componentWillUnmount() {
    clearInterval(this.totalRequestLoop);
    this.totalRequestLoop = null;
  }
}
