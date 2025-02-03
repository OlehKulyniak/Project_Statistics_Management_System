import { Component, OnInit, OnDestroy } from '@angular/core';
import { Risk } from '../risk';
import { registerLocaleData } from '@angular/common';
import localeIT from '@angular/common/locales/it';
import { DataService } from '../dataService';
registerLocaleData(localeIT);

@Component({
  selector: 'app-risk-identification',
  templateUrl: './risk-identification.component.html',
  styleUrl: './risk-identification.component.css',
})
export class RiskIdentificationComponent implements OnInit, OnDestroy {
  public technicalSummary: Risk;
  public technicalRisks: Risk[];
  public techRiskSummaryPercent: number;
  public costSummary: Risk;
  public costRisks: Risk[];
  public costRiskSummaryPercent: number;
  public plannedSummary: Risk;
  public plannedRisks: Risk[];
  public planRiskSummaryPercent: number;
  public realizationSummary: Risk;
  public realizationRisks: Risk[];
  public realRiskSummaryPercent: number;
  public totalSummary: number;
  public totalRiskNumber: number;

  constructor(private dataService: DataService) {
    this.technicalSummary = new Risk(dataService._techRiskSourceSummary);
    this.technicalRisks = [].constructor(
      dataService._technicalRiskSources.length
    );
    for (let i = 0; i < dataService._technicalRiskSources.length; i++) {
      this.technicalRisks[i] = new Risk(dataService._technicalRiskSources[i]);
      this.technicalRisks[i].probability = dataService._techRiskSourceProbs[i];
    }
    this.techRiskSummaryPercent = 0;
    this.costSummary = new Risk(dataService._costRiskSourceSummary);
    this.costRisks = [].constructor(dataService._costRiskSources.length);
    for (let i = 0; i < dataService._costRiskSources.length; i++) {
      this.costRisks[i] = new Risk(dataService._costRiskSources[i]);
      this.costRisks[i].probability = dataService._costRiskSourceProbs[i];
    }
    this.costRiskSummaryPercent = 0;
    this.plannedSummary = new Risk(dataService._planRiskSourceSummary);
    this.plannedRisks = [].constructor(dataService._plannedRiskSources.length);
    for (let i = 0; i < dataService._plannedRiskSources.length; i++) {
      this.plannedRisks[i] = new Risk(dataService._plannedRiskSources[i]);
      this.plannedRisks[i].probability = dataService._planRiskSourceProbs[i];
    }
    this.planRiskSummaryPercent = 0;
    this.realizationSummary = new Risk(dataService._realRiskSourceSummary);
    this.realizationRisks = [].constructor(
      dataService._realizationRiskSources.length
    );
    for (let i = 0; i < dataService._realizationRiskSources.length; i++) {
      this.realizationRisks[i] = new Risk(
        dataService._realizationRiskSources[i]
      );
      this.realizationRisks[i].probability =
        dataService._realRiskSourceProbs[i];
    }
    this.realRiskSummaryPercent = 0;
    this.totalSummary = 0;
    this.totalRiskNumber = 0;
    // this.fillRisksRandomGrades(this.technicalRisks);
    // this.fillRisksRandomGrades(this.costRisks);
    // this.fillRisksRandomGrades(this.plannedRisks);
    // this.fillRisksRandomGrades(this.realizationRisks);
  }

  public ngOnInit(): void {
    this.getSummaryGrades();
    this.totalRiskNumber =
      this.technicalRisks.length +
      this.costRisks.length +
      this.plannedRisks.length +
      this.realizationRisks.length;
    this.getSummaryPercentGrades();
  }

  public ngOnDestroy(): void {
    this.dataService._techRiskSourceProbs = this.technicalRisks.map(
      (elem) => elem.probability
    );
    this.dataService._costRiskSourceProbs = this.costRisks.map(
      (elem) => elem.probability
    );
    this.dataService._planRiskSourceProbs = this.plannedRisks.map(
      (elem) => elem.probability
    );
    this.dataService._realRiskSourceProbs = this.realizationRisks.map(
      (elem) => elem.probability
    );
  }

  public validateTechnicalGrade(i: number): void {
    this.technicalRisks[i].probability = this.validateInputValue(
      this.technicalRisks[i].probability
    );
    this.changeSummaryGrades();
  }

  public validateCostGrade(i: number): void {
    this.costRisks[i].probability = this.validateInputValue(
      this.costRisks[i].probability
    );
    this.changeSummaryGrades();
  }

  public validatePlannedGrade(i: number): void {
    this.plannedRisks[i].probability = this.validateInputValue(
      this.plannedRisks[i].probability
    );
    this.changeSummaryGrades();
  }

  public validateRealizationGrade(i: number): void {
    this.realizationRisks[i].probability = this.validateInputValue(
      this.realizationRisks[i].probability
    );
    this.changeSummaryGrades();
  }

  public validateInputValue(newValue: number): number {
    if (newValue > 1) {
      return 1;
    } else if (newValue < 0) {
      return 0;
    } else {
      return newValue;
    }
  }

  public changeSummaryGrades() {
    this.getSummaryGrades();
    this.totalRiskNumber =
      this.technicalRisks.length +
      this.costRisks.length +
      this.plannedRisks.length +
      this.realizationRisks.length;
    this.getSummaryPercentGrades();
  }

  public getSummaryPercentGrades() {
    this.techRiskSummaryPercent = Number(
      (
        (this.getSummary(this.technicalRisks) / this.totalRiskNumber) *
        100
      ).toFixed(2)
    );
    this.costRiskSummaryPercent = Number(
      ((this.getSummary(this.costRisks) / this.totalRiskNumber) * 100).toFixed(
        2
      )
    );
    this.planRiskSummaryPercent = Number(
      (
        (this.getSummary(this.plannedRisks) / this.totalRiskNumber) *
        100
      ).toFixed(2)
    );
    this.realRiskSummaryPercent = Number(
      (
        (this.getSummary(this.realizationRisks) / this.totalRiskNumber) *
        100
      ).toFixed(2)
    );
  }

  public getSummaryGrades() {
    this.technicalSummary.probability = Number(
      this.getSummary(this.technicalRisks).toFixed(2)
    );
    this.costSummary.probability = Number(
      this.getSummary(this.costRisks).toFixed(2)
    );
    this.plannedSummary.probability = Number(
      this.getSummary(this.plannedRisks).toFixed(2)
    );
    this.realizationSummary.probability = Number(
      this.getSummary(this.realizationRisks).toFixed(2)
    );
    this.totalSummary = this.getSummary([
      ...this.technicalRisks,
      ...this.costRisks,
      ...this.plannedRisks,
      ...this.realizationRisks,
    ]);
  }

  public fillRisksRandomGrades(risks: Risk[]): void {
    for (let i = 0; i < risks.length; i++) {
      risks[i].probability = Number(Math.random().toFixed(2));
    }
  }

  public getSummary(risks: Risk[]): number {
    return risks
      .map((elem) => elem.probability)
      .reduce((prevElem, nextElem) => prevElem + nextElem, 0);
  }
}
