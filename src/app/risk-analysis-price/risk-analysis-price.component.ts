import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RiskAnalysis } from '../riskAnalysis';
import { RiskAnalysisPrice } from '../riskAnalysisPrice';
import { PriceAnalysisService } from './priceAnalysisService';
import { DataService } from '../dataService';

@Component({
  selector: 'app-risk-analysis-price',
  templateUrl: './risk-analysis.component.html',
  styleUrl: './risk-analysis.component.css',
})
export class RiskAnalysisPriceComponent implements OnInit, OnDestroy {
  public technicalRiskSummary: RiskAnalysis;
  public technicalRisks: RiskAnalysis[];
  public costRiskSummary: RiskAnalysis;
  public costRisks: RiskAnalysis[];
  public plannedRiskSummary: RiskAnalysis;
  public plannedRisks: RiskAnalysis[];
  public realizationRiskSummary: RiskAnalysis;
  public realizationRisks: RiskAnalysis[];
  public technicalRiskWeight: number;
  public costRiskWeight: number;
  public plannedRiskWeight: number;
  public realizationRiskWeight: number;
  public technicalExpertGrades: number[];
  public costExpertGrades: number[];
  public plannedExpertGrades: number[];
  public realizationExpertGrades: number[];
  public techWeightedExpertGrades: number[];
  public costWeightedExpertGrades: number[];
  public planWeightedExpertGrades: number[];
  public realWeightedExpertGrades: number[];
  public expertRiskCoefficients: number[];
  @Input()
  public isPriceAnalysis: boolean;
  public totalRiskExpectedPrice: number;
  public riskTypeProportionalCoefs: number[];
  public technicalRiskSummaryPrice: RiskAnalysisPrice;
  public technicalRiskPrices: RiskAnalysisPrice[];
  public costRiskSummaryPrice: RiskAnalysisPrice;
  public costRiskPrices: RiskAnalysisPrice[];
  public plannedRiskSummaryPrice: RiskAnalysisPrice;
  public plannedRiskPrices: RiskAnalysisPrice[];
  public realizationRiskSummaryPrice: RiskAnalysisPrice;
  public realizationRiskPrices: RiskAnalysisPrice[];
  public techMaxAdditionalPrice: number;
  public techMinAdditionalPrice: number;
  public costMaxAdditionalPrice: number;
  public costMinAdditionalPrice: number;
  public planMaxAdditionalPrice: number;
  public planMinAdditionalPrice: number;
  public realMaxAdditionalPrice: number;
  public realMinAdditionalPrice: number;
  public riskMaxAdditionalPrice: number;
  public riskMinAdditionalPrice: number;
  public riskIntervalSize: number;

  constructor(private dataService: DataService) {
    this.technicalRiskWeight = 0;
    this.costRiskWeight = 0;
    this.plannedRiskWeight = 0;
    this.realizationRiskWeight = 0;
    this.technicalExpertGrades = [];
    this.costExpertGrades = [];
    this.plannedExpertGrades = [];
    this.realizationExpertGrades = [];
    this.techWeightedExpertGrades = [];
    this.costWeightedExpertGrades = [];
    this.planWeightedExpertGrades = [];
    this.realWeightedExpertGrades = [];
    this.expertRiskCoefficients = [];
    this.isPriceAnalysis = true;
    this.technicalRiskSummaryPrice = new RiskAnalysisPrice();
    this.technicalRiskPrices = [];
    this.costRiskSummaryPrice = new RiskAnalysisPrice();
    this.costRiskPrices = [];
    this.plannedRiskSummaryPrice = new RiskAnalysisPrice();
    this.plannedRiskPrices = [];
    this.realizationRiskSummaryPrice = new RiskAnalysisPrice();
    this.realizationRiskPrices = [];
    this.totalRiskExpectedPrice = 0;
    this.riskTypeProportionalCoefs = new Array(4);
    this.techMaxAdditionalPrice = 0;
    this.techMinAdditionalPrice = 0;
    this.costMaxAdditionalPrice = 0;
    this.costMinAdditionalPrice = 0;
    this.planMaxAdditionalPrice = 0;
    this.planMinAdditionalPrice = 0;
    this.realMaxAdditionalPrice = 0;
    this.realMinAdditionalPrice = 0;
    this.riskMaxAdditionalPrice = 0;
    this.riskMinAdditionalPrice = 0;
    this.riskIntervalSize = 0;

    this.technicalRiskSummary = dataService._techRiskEventSummary;
    this.technicalRisks = dataService._technicalRiskEvents;

    this.costRiskSummary = dataService._costRiskEventSummary;
    this.costRisks = dataService._costRiskEvents;

    this.plannedRiskSummary = dataService._planRiskEventSummary;
    this.plannedRisks = dataService._plannedRiskEvents;

    this.realizationRiskSummary = dataService._realRiskEventSummary;
    this.realizationRisks = dataService._realizationRiskEvents;

    this.totalRiskExpectedPrice = PriceAnalysisService.getTotalExpectedPrice();
    const riskTypeProbabilities = [
      this.getSumOfElements(
        this.technicalRisks.map((elem) => elem.probability)
      ),
      this.getSumOfElements(this.costRisks.map((elem) => elem.probability)),
      this.getSumOfElements(this.plannedRisks.map((elem) => elem.probability)),
      this.getSumOfElements(
        this.realizationRisks.map((elem) => elem.probability)
      ),
    ];
    this.riskTypeProportionalCoefs = this.getRiskProportionalCoefs(
      riskTypeProbabilities
    );

    if (
      dataService._technicalRiskSummaryPrice != null &&
      dataService._technicalRiskPrices != null
    ) {
      this.technicalRiskSummaryPrice = dataService._technicalRiskSummaryPrice;
      this.technicalRiskPrices = dataService._technicalRiskPrices;
    } else {
      this.fillRiskTypePriceData(
        this.technicalRiskSummaryPrice,
        this.technicalRiskPrices,
        this.technicalRisks,
        this.getSumOfElements(this.technicalRiskSummary.grades),
        this.totalRiskExpectedPrice,
        this.riskTypeProportionalCoefs[0],
        0.1
      );
    }

    if (
      dataService._costRiskSummaryPrice != null &&
      dataService._costRiskPrices != null
    ) {
      this.costRiskSummaryPrice = dataService._costRiskSummaryPrice;
      this.costRiskPrices = dataService._costRiskPrices;
    } else {
      this.fillRiskTypePriceData(
        this.costRiskSummaryPrice,
        this.costRiskPrices,
        this.costRisks,
        this.getSumOfElements(this.costRiskSummary.grades),
        this.totalRiskExpectedPrice,
        this.riskTypeProportionalCoefs[1],
        0.1
      );
    }

    if (
      dataService._plannedRiskSummaryPrice != null &&
      dataService._plannedRiskPrices != null
    ) {
      this.plannedRiskSummaryPrice = dataService._plannedRiskSummaryPrice;
      this.plannedRiskPrices = dataService._plannedRiskPrices;
    } else {
      this.fillRiskTypePriceData(
        this.plannedRiskSummaryPrice,
        this.plannedRiskPrices,
        this.plannedRisks,
        this.getSumOfElements(this.plannedRiskSummary.grades),
        this.totalRiskExpectedPrice,
        this.riskTypeProportionalCoefs[2],
        0.1
      );
    }

    if (
      dataService._realizationRiskSummaryPrice != null &&
      dataService._realizationRiskPrices != null
    ) {
      this.realizationRiskSummaryPrice =
        dataService._realizationRiskSummaryPrice;
      this.realizationRiskPrices = dataService._realizationRiskPrices;
    } else {
      this.fillRiskTypePriceData(
        this.realizationRiskSummaryPrice,
        this.realizationRiskPrices,
        this.realizationRisks,
        this.getSumOfElements(this.realizationRiskSummary.grades),
        this.totalRiskExpectedPrice,
        this.riskTypeProportionalCoefs[3],
        0.1
      );
    }
  }

  public ngOnInit() {
    this.solveClick();
  }

  public ngOnDestroy() {
    this.dataService._technicalRiskSummary.probability =
      this.technicalRiskSummary.probability;
    this.dataService._technicalRiskSummary.additionalPrice =
      this.technicalRiskSummaryPrice.additionalPrice;
    this.dataService._costRiskSummary.probability =
      this.costRiskSummary.probability;
    this.dataService._costRiskSummary.additionalPrice =
      this.costRiskSummaryPrice.additionalPrice;
    this.dataService._plannedRiskSummary.probability =
      this.plannedRiskSummary.probability;
    this.dataService._plannedRiskSummary.additionalPrice =
      this.plannedRiskSummaryPrice.additionalPrice;
    this.dataService._realizationRiskSummary.probability =
      this.realizationRiskSummary.probability;
    this.dataService._realizationRiskSummary.additionalPrice =
      this.realizationRiskSummaryPrice.additionalPrice;

    this.dataService._technicalRiskSummaryPrice =
      this.technicalRiskSummaryPrice;
    this.dataService._technicalRiskPrices = this.technicalRiskPrices;
    this.dataService._costRiskSummaryPrice = this.costRiskSummaryPrice;
    this.dataService._costRiskPrices = this.costRiskPrices;
    this.dataService._plannedRiskSummaryPrice = this.plannedRiskSummaryPrice;
    this.dataService._plannedRiskPrices = this.plannedRiskPrices;
    this.dataService._realizationRiskSummaryPrice =
      this.realizationRiskSummaryPrice;
    this.dataService._realizationRiskPrices = this.realizationRiskPrices;

    this.dataService._techRiskEventSummary = this.technicalRiskSummary;
    this.dataService._technicalRiskEvents = this.technicalRisks;
    this.dataService._costRiskEventSummary = this.costRiskSummary;
    this.dataService._costRiskEvents = this.costRisks;
    this.dataService._planRiskEventSummary = this.plannedRiskSummary;
    this.dataService._plannedRiskEvents = this.plannedRisks;
    this.dataService._realRiskEventSummary = this.realizationRiskSummary;
    this.dataService._realizationRiskEvents = this.realizationRisks;
  }

  public validateTechnicalGrade(): void {}

  public solveClick(): void {
    if (this.isPriceAnalysis) {
      const techAdditionalPrices = this.technicalRiskPrices.map(
        (elem) => elem.additionalPrice
      );
      this.techMaxAdditionalPrice = Math.max(...techAdditionalPrices);
      this.techMinAdditionalPrice = Math.min(...techAdditionalPrices);

      const costAdditionalPrices = this.costRiskPrices.map(
        (elem) => elem.additionalPrice
      );
      this.costMaxAdditionalPrice = Math.max(...costAdditionalPrices);
      this.costMinAdditionalPrice = Math.min(...costAdditionalPrices);

      const planAdditionalPrices = this.plannedRiskPrices.map(
        (elem) => elem.additionalPrice
      );
      this.planMaxAdditionalPrice = Math.max(...planAdditionalPrices);
      this.planMinAdditionalPrice = Math.min(...planAdditionalPrices);

      const realAdditionalPrices = this.realizationRiskPrices.map(
        (elem) => elem.additionalPrice
      );
      this.realMaxAdditionalPrice = Math.max(...realAdditionalPrices);
      this.realMinAdditionalPrice = Math.min(...realAdditionalPrices);

      this.riskMaxAdditionalPrice = Math.max(
        this.techMaxAdditionalPrice,
        this.costMaxAdditionalPrice,
        this.planMaxAdditionalPrice,
        this.realMaxAdditionalPrice
      );
      this.riskMinAdditionalPrice = Math.min(
        this.techMinAdditionalPrice,
        this.costMinAdditionalPrice,
        this.planMinAdditionalPrice,
        this.realMinAdditionalPrice
      );
      this.riskIntervalSize = Number(
        (
          (this.riskMaxAdditionalPrice - this.riskMinAdditionalPrice) /
          3
        ).toFixed(2)
      );
    }
  }

  public fillRiskTypePriceData(
    riskTypeSummaryPrice: RiskAnalysisPrice,
    riskTypeRiskPrices: RiskAnalysisPrice[],
    riskTypeRisks: RiskAnalysis[],
    weightExpertCoefSum: number,
    totalExpectedPrice: number,
    riskTypeProportionalCoef: number,
    startCoefficient: number
  ) {
    riskTypeSummaryPrice.expectedPrice = Number(
      (totalExpectedPrice * riskTypeProportionalCoef).toFixed(2)
    );
    let riskTypeCoefficientSum = 0;
    for (let i = 0; i < riskTypeRisks.length; i++) {
      riskTypeRiskPrices.push(new RiskAnalysisPrice());
      riskTypeRiskPrices[i].riskCoefficient =
        PriceAnalysisService.getRiskCoefficient(startCoefficient);
      riskTypeCoefficientSum += riskTypeRiskPrices[i].riskCoefficient;
    }

    for (let i = 0; i < riskTypeRisks.length; i++) {
      riskTypeRiskPrices[i].expectedPrice = Number(
        PriceAnalysisService.getRiskExpectedPrice(
          riskTypeRiskPrices[i].riskCoefficient,
          riskTypeSummaryPrice.expectedPrice,
          riskTypeCoefficientSum
        ).toFixed(2)
      );
      riskTypeRiskPrices[i].additionalPrice = Number(
        PriceAnalysisService.getRiskAdditionalPrice(
          riskTypeRisks[i].weightedGrades,
          weightExpertCoefSum,
          riskTypeRiskPrices[i].expectedPrice
        ).toFixed(2)
      );
      riskTypeRiskPrices[i].finalPrice = Number(
        (
          riskTypeRiskPrices[i].expectedPrice +
          riskTypeRiskPrices[i].additionalPrice
        ).toFixed(2)
      );
    }
    riskTypeSummaryPrice.additionalPrice = Number(
      this.getSumOfElements(
        riskTypeRiskPrices.map((elem) => elem.additionalPrice)
      ).toFixed(2)
    );
    riskTypeSummaryPrice.finalPrice = Number(
      this.getSumOfElements(
        riskTypeRiskPrices.map((elem) => elem.finalPrice)
      ).toFixed(2)
    );
  }

  public updateRiskTypeRisks(
    i: number,
    j: number,
    event: Event,
    riskTypeRisks: RiskAnalysis[],
    riskTypeSummary: RiskAnalysis,
    riskTypeWeightedExpertGrades: number[],
    riskTypeSummaryPrice: RiskAnalysisPrice,
    riskTypePrices: RiskAnalysisPrice[]
  ): void {
    riskTypeRisks[i].grades[j] = this.validateInputValue(
      Number((event.target as HTMLInputElement).value)
    );

    let riskTypeCoefSum = this.getSumOfElements(riskTypeSummary.grades);
    for (let i = 0; i < riskTypeRisks.length; i++) {
      riskTypeRisks[i].weightedGrades = this.getWeightedcentralTableCells(
        riskTypeRisks[i].grades,
        riskTypeSummary.grades,
        riskTypeRisks[i].probability
      );
      riskTypeWeightedExpertGrades[i] = Number(
        this.getSumOfElements(riskTypeRisks[i].weightedGrades) / riskTypeCoefSum
      );
    }
    for (let i = 0; i < riskTypeSummary.grades.length; i++) {
      const weightedExpertGrades = riskTypeRisks.map((elem) => elem.grades[i]);
      riskTypeSummary.weightedGrades[i] = Number(
        this.getWeightedExpertGrades(
          weightedExpertGrades,
          riskTypeSummary.grades[i]
        ).toFixed(2)
      );
      riskTypePrices[i].additionalPrice = Number(
        PriceAnalysisService.getRiskAdditionalPrice(
          riskTypeRisks[i].weightedGrades,
          riskTypeCoefSum,
          riskTypePrices[i].expectedPrice
        ).toFixed(2)
      );
      riskTypePrices[i].finalPrice = Number(
        (
          riskTypePrices[i].expectedPrice + riskTypePrices[i].additionalPrice
        ).toFixed(2)
      );
    }
    riskTypeSummaryPrice.additionalPrice = Number(
      this.getSumOfElements(
        riskTypePrices.map((elem) => elem.additionalPrice)
      ).toFixed(2)
    );
    riskTypeSummaryPrice.finalPrice = Number(
      this.getSumOfElements(
        riskTypePrices.map((elem) => elem.finalPrice)
      ).toFixed(2)
    );
  }

  public validateInputValue(newValue: number) {
    if (newValue > 1) {
      return 1;
    } else if (newValue < 0) {
      return 0;
    }
    return newValue;
  }

  public getRiskProportionalCoefs(riskTypeProbabilities: number[]): number[] {
    const riskTypePriceCoefs: number[] = [];
    const riskTypeProportionalCoefs: number[] = [];
    let riskPriceCoefSum = 0;
    for (let i = 0; i < riskTypeProbabilities.length; i++) {
      riskTypePriceCoefs.push(
        PriceAnalysisService.getRiskPriceCoef(riskTypeProbabilities[i])
      );
      riskPriceCoefSum += riskTypePriceCoefs[i];
    }
    for (let i = 0; i < riskTypePriceCoefs.length; i++) {
      riskTypeProportionalCoefs.push(
        PriceAnalysisService.getRiskPriceCoefProportional(
          riskTypePriceCoefs[i],
          riskPriceCoefSum
        )
      );
    }

    return riskTypeProportionalCoefs;
  }

  public getSumOfElements(valueArr: number[]): number {
    return valueArr.reduce((prevElem, nextElem) => prevElem + nextElem, 0);
  }

  public getAverageOfElements(valueArr: number[]): number {
    return (
      valueArr.reduce((prevElem, nextElem) => prevElem + nextElem, 0) /
      valueArr.length
    );
  }

  public getRisksProbability(risks: RiskAnalysis[]): number[] {
    return risks.map((elem) => elem.probability);
  }

  public getGradeTitle(centralTableCell: number): string {
    if (centralTableCell < 0.1) {
      return 'Дуже низькою';
    } else if (centralTableCell < 0.25) {
      return 'Низькою';
    } else if (centralTableCell < 0.5) {
      return 'Середньою';
    } else if (centralTableCell < 0.75) {
      return 'Високою';
    } else {
      return 'Дуже високою';
    }
  }

  public getPriceGradeTitle(
    riskAdditionalPrice: number,
    riskMinAdditionalPrice: number,
    riskIntervalSize: number
  ): string {
    let riskInterval = riskMinAdditionalPrice + riskIntervalSize;
    if (riskInterval > riskAdditionalPrice) {
      return 'Низький';
    } else if (riskInterval + riskIntervalSize > riskAdditionalPrice) {
      return 'Середній';
    } else if (riskAdditionalPrice < riskInterval + riskIntervalSize * 2) {
      return 'Високий';
    } else {
      return 'Виходить за межі';
    }
  }

  public getWeightedExpertGrades(
    weightedGradeArr: number[],
    expertcentralTableCell: number
  ): number {
    return (
      weightedGradeArr.reduce((prevElem, nextElem) => prevElem + nextElem, 0) /
      weightedGradeArr.length /
      expertcentralTableCell
    );
  }

  public getExpertcentralTableCells(
    startGrade: number,
    expertRiskCoefficients: number[]
  ): number[] {
    const expertcentralTableCellArr: number[] = [];
    const centralTableCell = startGrade + Math.random() * startGrade;
    for (let i = 0; i < expertRiskCoefficients.length; i++) {
      expertcentralTableCellArr.push(
        Number(
          (
            centralTableCell +
            Math.random() * expertRiskCoefficients[i]
          ).toFixed(2)
        )
      );
    }

    return expertcentralTableCellArr;
  }

  public getWeightedcentralTableCells(
    expertcentralTableCellArr: number[],
    weightExpertCoefs: number[],
    riskChance: number
  ): number[] {
    if (expertcentralTableCellArr.length != weightExpertCoefs.length) {
      return [];
    }
    const weightedcentralTableCells = new Array(
      expertcentralTableCellArr.length
    );
    if (riskChance > 0) {
      for (let i = 0; i < expertcentralTableCellArr.length; i++) {
        weightedcentralTableCells[i] = Number(
          (expertcentralTableCellArr[i] * weightExpertCoefs[i]).toFixed(2)
        );
      }
    } else {
      for (let i = 0; i < weightedcentralTableCells.length; i++) {
        weightedcentralTableCells[i] = 0;
      }
    }
    return weightedcentralTableCells;
  }
}
