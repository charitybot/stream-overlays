export default class EventService {
  private debug: boolean = false;

  constructor(debug: boolean) {
    this.debug = debug;
    console.log(`Using API Url: ${this.getApiUrl()}`);
  }

  public async fetchEventTotal(eventIdentifer: string): Promise<number> {
    const url: string = `${this.getApiUrl()}/event/${eventIdentifer}/total/`;
    return this.getRequest(url);
  }

  private async getRequest(url: string): Promise<any> {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(response.status);
      console.error(response.statusText);
    }
    const data = await response.json();
    return data;
  }

  private getApiUrl(): string {
    const BASE_URL: string = this.debug ? 'http://127.0.0.1:8001' : 'https://api.charitybot.net';
    const API_URL: string = `${BASE_URL}/api/v1`;
    return API_URL;
  }
}
