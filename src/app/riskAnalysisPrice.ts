export class RiskAnalysisPrice {
  private _riskCoefficient: number;
  private _expectedPrice: number;
  private _additionalPrice: number;
  private _finalPrice: number;

  constructor() {
    this._riskCoefficient = 0;
    this._expectedPrice = 0;
    this._additionalPrice = 0;
    this._finalPrice = 0;
  }

  public get riskCoefficient(): number {
    return this._riskCoefficient;
  }

  public set riskCoefficient(riskCoefficient: number) {
    this._riskCoefficient = riskCoefficient;
  }

  public get expectedPrice(): number {
    return this._expectedPrice;
  }
  public set expectedPrice(expectedPrice: number) {
    this._expectedPrice = expectedPrice;
  }

  public get additionalPrice(): number {
    return this._additionalPrice;
  }

  public set additionalPrice(additionalPrice: number) {
    this._additionalPrice = additionalPrice;
  }

  public get finalPrice(): number {
    return this._finalPrice;
  }

  public set finalPrice(finalPrice: number) {
    this._finalPrice = finalPrice;
  }
}
