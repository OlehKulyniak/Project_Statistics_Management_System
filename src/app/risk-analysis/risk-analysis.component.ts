import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  AfterContentChecked,
  OnDestroy,
} from '@angular/core';
import { RiskAnalysis } from '../riskAnalysis';
import { DataService } from '../dataService';
import { registerLocaleData } from '@angular/common';
import localeIT from '@angular/common/locales/it';

registerLocaleData(localeIT);

@Component({
  selector: 'app-risk-analysis',
  templateUrl: './risk-analysis.component.html',
  styleUrl: './risk-analysis.component.css',
})
export class RiskAnalysisComponent
  implements OnInit, AfterContentChecked, OnDestroy
{
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
  // public technicalExpertGrades: number[];
  // public costExpertGrades: number[];
  // public plannedExpertGrades: number[];
  // public realizationExpertGrades: number[];
  public techWeightedExpertGrades: number[];
  public costWeightedExpertGrades: number[];
  public planWeightedExpertGrades: number[];
  public realWeightedExpertGrades: number[];
  public expertRiskCoefficients: number[];
  @Input()
  public isPriceAnalysis: boolean;
  public totalRiskExpectedPrice: number;
  public riskTypeProportionalCoefs: number[];
  // public technicalRiskSummaryPrice: RiskAnalysisPrice;
  // public technicalRiskPrices: RiskAnalysisPrice[];
  // public costRiskSummaryPrice: RiskAnalysisPrice;
  // public costRiskPrices: RiskAnalysisPrice[];
  // public plannedRiskSummaryPrice: RiskAnalysisPrice;
  // public plannedRiskPrices: RiskAnalysisPrice[];
  // public realizationRiskSummaryPrice: RiskAnalysisPrice;
  // public realizationRiskPrices: RiskAnalysisPrice[];
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

  constructor(
    private dataService: DataService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.technicalRiskSummary = dataService._techRiskEventSummary;

    this.technicalRisks = new Array(dataService._technicalRiskEvents.length);
    for (let i = 0; i < dataService._technicalRiskEvents.length; i++) {
      this.technicalRisks[i] = new RiskAnalysis(
        dataService._technicalRiskEvents[i].name
      );
      this.technicalRisks[i].probability =
        dataService._technicalRiskEvents[i].probability;
    }

    this.technicalRisks = dataService._technicalRiskEvents;

    this.costRiskSummary = dataService._costRiskEventSummary;
    this.costRisks = new Array(dataService._costRiskEvents.length);
    for (let i = 0; i < dataService._costRiskEvents.length; i++) {
      this.costRisks[i] = new RiskAnalysis(dataService._costRiskEvents[i].name);
      this.costRisks[i].probability =
        dataService._costRiskEvents[i].probability;
    }

    this.costRisks = dataService._costRiskEvents;

    this.plannedRiskSummary = dataService._costRiskEventSummary;
    this.plannedRisks = new Array(dataService._plannedRiskEvents.length);
    for (let i = 0; i < dataService._plannedRiskEvents.length; i++) {
      this.plannedRisks[i] = new RiskAnalysis(
        dataService._plannedRiskEvents[i].name
      );
      this.plannedRisks[i].probability =
        dataService._plannedRiskEvents[i].probability;
    }

    this.plannedRisks = dataService._plannedRiskEvents;

    this.realizationRiskSummary = dataService._realRiskEventSummary;

    this.realizationRisks = new Array(
      dataService._realizationRiskEvents.length
    );
    for (let i = 0; i < dataService._realizationRiskEvents.length; i++) {
      this.realizationRisks[i] = new RiskAnalysis(
        dataService._realizationRiskEvents[i].name
      );
      this.realizationRisks[i].probability =
        dataService._realizationRiskEvents[i].probability;
    }

    this.realizationRisks = dataService._realizationRiskEvents;

    this.technicalRiskWeight = 0;
    this.costRiskWeight = 0;
    this.plannedRiskWeight = 0;
    this.realizationRiskWeight = 0;
    // this.technicalExpertGrades = [];
    // this.costExpertGrades = [];
    // this.plannedExpertGrades = [];
    // this.realizationExpertGrades = [];
    this.techWeightedExpertGrades = dataService.techWeightedExpertGrades;
    this.costWeightedExpertGrades = dataService.costWeightedExpertGrades;
    this.planWeightedExpertGrades = dataService.planWeightedExpertGrades;
    this.realWeightedExpertGrades = dataService.realWeightedExpertGrades;
    this.expertRiskCoefficients = dataService.expertRiskCoefficients;
    this.isPriceAnalysis = false;
    // this.technicalRiskSummaryPrice = new RiskAnalysisPrice();
    // this.technicalRiskPrices = [];
    // this.costRiskSummaryPrice = new RiskAnalysisPrice();
    // this.costRiskPrices = [];
    // this.plannedRiskSummaryPrice = new RiskAnalysisPrice();
    // this.plannedRiskPrices = [];
    // this.realizationRiskSummaryPrice = new RiskAnalysisPrice();
    // this.realizationRiskPrices = [];
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
  }

  public ngOnInit() {
    this.solveClick();
  }

  public ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  public ngOnDestroy() {
    this.dataService._techRiskEventSummary = this.technicalRiskSummary;
    this.dataService._technicalRiskEvents = this.technicalRisks;
    this.dataService._costRiskEventSummary = this.costRiskSummary;
    this.dataService._costRiskEvents = this.costRisks;
    this.dataService._planRiskEventSummary = this.plannedRiskSummary;
    this.dataService._plannedRiskEvents = this.plannedRisks;
    this.dataService._realRiskEventSummary = this.realizationRiskSummary;
    this.dataService._realizationRiskEvents = this.realizationRisks;
  }

  public solveClick(): void {
    this.technicalRiskWeight = this.getRiskWeight();
    this.costRiskWeight = this.getRiskWeight();
    this.plannedRiskWeight = this.getRiskWeight();
    this.realizationRiskWeight = this.getRiskWeight();
    // this.expertRiskCoefficients = this.getExpertRiskCoefficients(0.1, 10);

    // this.fillRiskBaseInformation(
    //   this.technicalRiskSummary,
    //   this.technicalRisks,
    //   this.technicalRiskWeight,
    //   0.1,
    //   this.expertRiskCoefficients,
    //   this.techWeightedExpertGrades
    // );

    // this.fillRiskBaseInformation(
    //   this.costRiskSummary,
    //   this.costRisks,
    //   this.costRiskWeight,
    //   0.1,
    //   this.expertRiskCoefficients,
    //   this.costWeightedExpertGrades
    // );

    // this.fillRiskBaseInformation(
    //   this.plannedRiskSummary,
    //   this.plannedRisks,
    //   this.plannedRiskWeight,
    //   0.1,
    //   this.expertRiskCoefficients,
    //   this.planWeightedExpertGrades
    // );

    // this.fillRiskBaseInformation(
    //   this.realizationRiskSummary,
    //   this.realizationRisks,
    //   this.realizationRiskWeight,
    //   0.1,
    //   this.expertRiskCoefficients,
    //   this.realWeightedExpertGrades
    // );
  }

  // public fillRiskBaseInformation(
  //   riskTypeSummary: RiskAnalysis,
  //   riskTypeRisks: RiskAnalysis[],
  //   riskTypeWeight: number,
  //   riskTypeStartCoef: number,
  //   expertRiskCoefficients: number[],
  //   riskTypeWeightedExpertGrades: number[]
  // ): void {
  //   riskTypeSummary.grades = this.getWeightExpertCoefs(riskTypeWeight, 10);
  //   const riskTypeWeightedCoefSum = this.getSumOfElements(
  //     riskTypeSummary.grades
  //   );

  //   for (let i = 0; i < riskTypeRisks.length; i++) {
  //     riskTypeRisks[i].grades = this.getExpertcentralTableCells(
  //       riskTypeStartCoef,
  //       expertRiskCoefficients
  //     );
  //     riskTypeRisks[i].weightedGrades = this.getWeightedcentralTableCells(
  //       riskTypeRisks[i].grades,
  //       riskTypeSummary.grades,
  //       riskTypeRisks[i].probability
  //     );
  //     riskTypeWeightedExpertGrades.push(
  //       Number(
  //         (
  //           this.getSumOfElements(riskTypeRisks[i].weightedGrades) /
  //           riskTypeWeightedCoefSum
  //         ).toFixed(2)
  //       )
  //     );
  //   }
  //   riskTypeSummary.weightedGrades = [];
  //   for (let i = 0; i < riskTypeSummary.grades.length; i++) {
  //     const weightedExpertGrades = riskTypeRisks.map(
  //       (elem) => elem.weightedGrades[i]
  //     );
  //     riskTypeSummary.weightedGrades.push(
  //       Number(
  //         this.getWeightedExpertGrades(
  //           weightedExpertGrades,
  //           riskTypeSummary.grades[i]
  //         ).toFixed(2)
  //       )
  //     );
  //   }
  // }

  public updateRiskTypeRisks(
    i: number,
    j: number,
    event: Event,
    riskTypeRisks: RiskAnalysis[],
    riskTypeSummary: RiskAnalysis,
    riskTypeWeightedExpertGrades: number[]
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
    }
  }

  public validateInputValue(newValue: number) {
    if (newValue > 1) {
      return 1;
    } else if (newValue < 0) {
      return 0;
    }
    return newValue;
  }

  public getRiskWeight(): number {
    return 5 * (Math.random() * 3);
  }

  // public getWeightExpertCoefs(
  //   riskWeight: number,
  //   riskLength: number
  // ): number[] {
  //   let centralTableCellArr = [];
  //   for (let i = 0; i < riskLength; i++) {
  //     let expertcentralTableCell =
  //       riskWeight + Math.random() * (12 - riskWeight);
  //     centralTableCellArr.push(
  //       expertcentralTableCell > 10
  //         ? 10
  //         : Number(expertcentralTableCell.toFixed(0))
  //     );
  //   }

  //   return centralTableCellArr;
  // }

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

  // public getExpertRiskCoefficients(
  //   startGrade: number,
  //   riskLength: number
  // ): number[] {
  //   const expertRiskCoefficients: number[] = [];
  //   for (let i = 0; i < riskLength; i++) {
  //     expertRiskCoefficients.push(startGrade + Math.random() * 0.7);
  //   }

  //   return expertRiskCoefficients;
  // }

  // public getExpertcentralTableCells(
  //   startGrade: number,
  //   expertRiskCoefficients: number[]
  // ): number[] {
  //   const expertcentralTableCellArr: number[] = [];
  //   const centralTableCell = startGrade + Math.random() * startGrade;
  //   for (let i = 0; i < expertRiskCoefficients.length; i++) {
  //     expertcentralTableCellArr.push(
  //       Number(
  //         (
  //           centralTableCell +
  //           Math.random() * expertRiskCoefficients[i]
  //         ).toFixed(2)
  //       )
  //     );
  //   }

  //   return expertcentralTableCellArr;
  // }

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
