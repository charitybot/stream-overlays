import DonationStore from './DonationStore';

import EventService from '../services/EventService';

export default class RootStore {
  public donationStore: DonationStore;

  public eventService: EventService = new EventService();

  constructor() {
    this.donationStore = new DonationStore(this);
  }
}
