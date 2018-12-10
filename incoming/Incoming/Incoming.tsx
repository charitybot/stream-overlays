import * as React from 'react';
import { observer, inject } from 'mobx-react';

import Donation from '../../common/models/Donation';

import DonationService from '../../common/services/DonationService';
import { observable, action } from 'mobx';

const REQUEST_DELAY: number = 4000;

interface IIncomingProps {
  eventIdentifier: string;
  debug: boolean;
}

@inject('rootStore')
@observer
export default class Incoming extends React.Component<IIncomingProps> {
  @observable private latestDonation: Donation | null;
  @observable private lastDonationReference: string = '';
  private requestLoop: NodeJS.Timer | null;
  private donationService: DonationService = new DonationService(this.props.debug);

  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    console.log(`Mounting Incoming Overlay for Event with Identifier: ${this.props.eventIdentifier}`);
    this.requestLoop = setInterval(() => {
      this.updateLatestDonation().then((donation: Donation) => {
        if (this.lastDonationReference !== donation.internalReference) {
          this.setLatestDonation(donation);
          this.setLastDonationReference(donation.internalReference);
        } else {
          this.setLatestDonation(null);
        }
      });
    }, REQUEST_DELAY);
  }

  public render() {
    if (!this.latestDonation) {
      return null;
    }
    return (
      <span id="incoming-donations">
        {this.latestDonation.donor ? this.latestDonation.donor : 'Anonymouos'} donated {this.latestDonation.amount}!
      </span>
    );
  }

  private updateLatestDonation(): Promise<Donation | void> {
    return this.donationService.fetchLatestDonation(this.props.eventIdentifier).catch(error => console.error(error));
  }

  @action('Setting latest donation')
  private setLatestDonation(latestDonation: Donation): void {
    this.latestDonation = latestDonation;
  }

  @action('Set last donation reference')
  private setLastDonationReference(reference: string): void {
    this.lastDonationReference = reference;
  }

  public componentWillUnmount() {
    clearInterval(this.requestLoop);
    this.requestLoop = null;
  }
}
