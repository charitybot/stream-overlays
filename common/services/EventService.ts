import ApiService from './ApiService';

export default class EventService extends ApiService {
  constructor(debug: boolean) {
    super(debug);
  }

  public async fetchEventTotal(eventIdentifer: string): Promise<number> {
    const url: string = `${this.getApiUrl()}/event/${eventIdentifer}/total/`;
    return this.getRequest(url);
  }
}
