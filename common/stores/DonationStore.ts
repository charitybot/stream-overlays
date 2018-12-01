import { observable, action, toJS } from 'mobx';

import Store from './Store';
import RootStore from './RootStore';

import Donation from '../models/Donation';

export default class DonationStore extends Store {
  @observable private total: number = 0.0;
  @observable public donations: Donation[] = [];

  constructor(rootStore: RootStore) {
    super(rootStore);
  }

  public getTotal(): number {
    const total: number | undefined = toJS(this.total)['total'];
    return total ? total : 0; // Because for some reason, I cannot access total directly once it is updated
  }

  public async fetchEventTotal(eventIdentifier: string): Promise<number> {
    const total: number = await this.rootStore.eventService.fetchEventTotal(eventIdentifier);
    this.setTotal(total);
    return total;
  }

  @action('Setting the event total amount')
  private setTotal(total: number): void {
    this.total = total;
  }
}
