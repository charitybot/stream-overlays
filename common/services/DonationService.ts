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

  // This is due to using a pre-rewrite API call which returned the donations as a JSON string
  private parseDonation(donationStr: string): Donation {
    const jsonDonation = JSON.parse(donationStr);
    const donation: Donation = new Donation();
    donation.amount = jsonDonation['amount'];
    donation.donor = jsonDonation['donor'];
    donation.timestamp = new Date(jsonDonation['timestamp'] * 1000); // timestamp arrives in unix seconds timestamp format
    return donation;
  }
}
