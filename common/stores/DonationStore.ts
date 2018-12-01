import { observable } from 'mobx';
import Donation from '../models/Donation';

export default class DonationStore {
  @observable public total: number = 0.0;
  @observable public donations: Donation[] = [];
}
