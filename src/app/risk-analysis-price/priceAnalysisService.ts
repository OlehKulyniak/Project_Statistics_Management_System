import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PriceAnalysisService {
  public static getRiskPriceCoef(currRiskProbability: number): number {
    return currRiskProbability + (Math.random() * currRiskProbability) / 3;
  }

  public static getRiskPriceCoefProportional(
    riskPriceCoef: number,
    totalPriceCoef: number
  ): number {
    return riskPriceCoef / totalPriceCoef;
  }

  public static getTotalExpectedPrice(): number {
    const startPrice = 300 + Math.random() * 1000;
    return startPrice + (Math.random() * startPrice) / 2;
  }

  public static getRiskTypeExpectedPrice(
    riskTypeProportionalCoef: number,
    totalExpectedPrice: number
  ): number {
    return totalExpectedPrice * riskTypeProportionalCoef;
  }

  public static getRiskCoefficient(startCoeficient: number): number {
    return Number(
      (startCoeficient * Math.random() * startCoeficient).toFixed(3)
    );
  }

  public static getRiskExpectedPrice(
    riskCoefficient: number,
    riskTypeExpectedPrice: number,
    riskCoefficientSum: number
  ): number {
    return (riskTypeExpectedPrice * riskCoefficient) / riskCoefficientSum;
  }

  public static getRiskAdditionalPrice(
    weightedcentralTableCells: number[],
    weightExpertCoefSum: number,
    riskExpectedPrice: number
  ): number {
    return (
      (weightedcentralTableCells.reduce(
        (prevElem, nextElem) => prevElem + nextElem,
        0
      ) /
        weightExpertCoefSum) *
      riskExpectedPrice
    );
  }
}
