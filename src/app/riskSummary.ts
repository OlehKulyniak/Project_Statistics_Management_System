export class RiskSummary {
  private _name: string;
  private _probability: number;
  private _additionalPrice: number;

  constructor(name: string) {
    this._name = name;
    this._probability = 0;
    this._additionalPrice = 0;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get probability(): number {
    return this._probability;
  }

  public set probability(probability: number) {
    this._probability = probability;
  }

  public get additionalPrice(): number {
    return this._additionalPrice;
  }

  public set additionalPrice(additionalPrice: number) {
    this._additionalPrice = additionalPrice;
  }
}
