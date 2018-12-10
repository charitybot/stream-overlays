// TODO: Adopt a proper de/serialisation library

export default class Donation {
  public internalReference: string;
  public amount: number = 0.0;
  public donor: string = '';
  public timestamp: Date;
}
