// TODO: Set depending on dev/prod
const BASE_URL: string = window['apiAddress'] ? 'https://api.charitybot.net' : 'http://127.0.0.1:8001';
const API_URL: string = `${BASE_URL}/api/v1`;

console.log(`Using API Url: ${API_URL}`);

export default class EventService {
  public async fetchEventTotal(eventIdentifer: string): Promise<number> {
    return this.getRequest(`${API_URL}/event/${eventIdentifer}/total/`);
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
}
