// TODO: Set depending on dev/prod
const API_URL: string = `http://127.0.0.1:8001/api/v1`;

export default class EventService {
  public async fetchEventTotal(eventIdentifer: string): Promise<number> {
    return this.getRequest(`${API_URL}/event/${eventIdentifer}/total/`);
  }

  private async getRequest(url: string): Promise<any> {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}
