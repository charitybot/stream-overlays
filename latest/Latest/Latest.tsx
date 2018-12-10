import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import * as moment from 'moment';

import Donation from '../../common/models/Donation';

import DonationService from '../../common/services/DonationService';

const REQUEST_DELAY: number = 2000;

interface ILatestProps {
  eventIdentifier: string;
  debug: boolean;
}

@observer
export default class Latest extends React.Component<ILatestProps> {
  @observable private latestDonation: Donation | null;
  private requestLoop: NodeJS.Timer | null;
  private donationService: DonationService = new DonationService(this.props.debug);

  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    console.log(`Mounting Latest Overlay for Event with Identifier: ${this.props.eventIdentifier}`);
    this.updateLatestDonation();
    this.requestLoop = setInterval(() => {
      this.updateLatestDonation().then((donation: Donation) => {
        this.setLatestDonation(donation);
      });
    }, REQUEST_DELAY);
  }

  public render() {
    return (
      <span id="latest-donation">
        {this.latestDonation ? this.getDonationMessage() : 'Waiting for the first donation!'}
      </span>
    );
  }

  private getDonationMessage(): string {
    return `${this.latestDonation.amount} from ${this.latestDonation.donor ? this.latestDonation.donor : 'Anonymous'}, 
    ${this.formatDuration(this.latestDonation.timestamp)} ago`;
  }

  private formatDuration(donationDate: Date): string {
    const duration = moment.duration(moment().diff(moment(donationDate)));
    const hours: number = duration.hours();
    const minutes: number = duration.minutes();
    const seconds: number = duration.seconds();
    let formattedString: string = `${seconds} second${seconds === 1 ? '' : 's'}`;
    if (minutes > 0) {
      formattedString = `${minutes} minute${minutes === 1 ? '' : 's'}, ${formattedString}`;
    }
    if (hours > 0) {
      formattedString = `${hours} hour${hours === 1 ? '' : 's'}, ${formattedString}`;
    }
    return formattedString;
  }

  private updateLatestDonation(): Promise<Donation | void> {
    return this.donationService.fetchLatestDonation(this.props.eventIdentifier).catch(error => console.error(error));
  }

  @action('Setting latest donation')
  private setLatestDonation(latestDonation: Donation): void {
    this.latestDonation = latestDonation;
  }

  public componentWillUnmount() {
    clearInterval(this.requestLoop);
    this.requestLoop = null;
  }
}
