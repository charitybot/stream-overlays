import ApiService from './ApiService';

import Donation from '../models/Donation';

export default class DonationService extends ApiService {
  constructor(debug: boolean) {
    super(debug);
  }

  public async fetchLatestDonation(eventIdentifer: string): Promise<Donation> {
    const url: string = `${this.getApiUrl()}/event/${eventIdentifer}/donations/?limit=1`;
    const result: any = await this.getRequest(url);
    return this.parseDonation(result['donations']);
  }

  public async fetchLastSetOfDonations(eventIdentifer: string, limit?: number): Promise<Donation[]> {
    const url: string = `${this.getApiUrl()}/event/${eventIdentifer}/donations/?limit=${limit ? limit : 5}`;
    const result: any = await this.getRequest(url);
    const donations: Donation[] = result['donations'].map(jsonDonation => this.parseDonation(jsonDonation));
    return donations;
  }

  // This is due to using a pre-rewrite API call which returned the donations as a JSON string
  private parseDonation(donationStr: string): Donation {
    const jsonDonation = JSON.parse(donationStr);
    const donation: Donation = new Donation();
    donation.internalReference = jsonDonation['internal_reference'];
    donation.amount = jsonDonation['amount'];
    donation.donor = jsonDonation['donor_name'];
    donation.timestamp = new Date(jsonDonation['timestamp'] * 1000); // timestamp arrives in unix seconds timestamp format
    return donation;
  }
}
