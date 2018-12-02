import DonationStore from './DonationStore';

import EventService from '../services/EventService';

export default class RootStore {
  public donationStore: DonationStore;
  public eventService: EventService;

  constructor(debug?: boolean) {
    this.donationStore = new DonationStore(this);
    this.eventService = new EventService(debug);
  }
}
