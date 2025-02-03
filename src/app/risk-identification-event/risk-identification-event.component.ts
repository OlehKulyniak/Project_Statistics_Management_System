import { Component, OnDestroy } from '@angular/core';
import { Risk } from '../risk';
import { DataService } from '../dataService';
import { registerLocaleData } from '@angular/common';
import localeIT from '@angular/common/locales/it';
registerLocaleData(localeIT);

@Component({
  selector: 'app-risk-identification-event',
  templateUrl: './risk-identification-event.component.html',
  styleUrl: './risk-identification-event.component.css',
})
export class RiskIdentificationEventComponent implements OnDestroy {
  public technicalSummary: Risk;
  public technicalRisks: Risk[];
  public costSummary: Risk;
  public costRisks: Risk[];
  public plannedSummary: Risk;
  public plannedRisks: Risk[];
  public realizationSummary: Risk;
  public realizationRisks: Risk[];
  public totalSummary: number;
  public totalRiskNumber: number;

  constructor(private dataService: DataService) {
    this.technicalSummary = new Risk(dataService._technicalRiskSummary.name);
    this.technicalRisks = [];
    for (let i = 0; i < dataService._technicalRiskEvents.length; i++) {
      this.technicalRisks.push(
        new Risk(dataService._technicalRiskEvents[i].name)
      );
      this.technicalRisks[i].probability =
        dataService._technicalRiskEvents[i].probability;
    }
    this.costSummary = new Risk(dataService._costRiskSummary.name);
    this.costRisks = [];
    for (let i = 0; i < dataService._costRiskEvents.length; i++) {
      this.costRisks.push(new Risk(dataService._costRiskEvents[i].name));
      this.costRisks[i].probability =
        dataService._costRiskEvents[i].probability;
    }
    this.plannedSummary = new Risk(dataService._plannedRiskSummary.name);
    this.plannedRisks = [];
    for (let i = 0; i < dataService._plannedRiskEvents.length; i++) {
      this.plannedRisks.push(new Risk(dataService._plannedRiskEvents[i].name));
      this.plannedRisks[i].probability =
        dataService._plannedRiskEvents[i].probability;
    }
    this.realizationSummary = new Risk(
      dataService._realizationRiskSummary.name
    );
    this.realizationRisks = [];
    for (let i = 0; i < dataService._realizationRiskEvents.length; i++) {
      this.realizationRisks.push(
        new Risk(dataService._realizationRiskEvents[i].name)
      );
      this.realizationRisks[i].probability =
        dataService._realizationRiskEvents[i].probability;
    }
    this.totalSummary = 0;
    this.totalRiskNumber = 0;
  }

  public ngOnInit(): void {
    // this.fillRisksRandomGrades(this.technicalRisks);
    // this.fillRisksRandomGrades(this.costRisks);
    // this.fillRisksRandomGrades(this.plannedRisks);
    // this.fillRisksRandomGrades(this.realizationRisks);

    this.getSummaryGrades();
    this.totalRiskNumber =
      this.technicalRisks.length +
      this.costRisks.length +
      this.plannedRisks.length +
      this.realizationRisks.length;
  }

  public ngOnDestroy(): void {
    for (let i = 0; i < this.technicalRisks.length; i++) {
      this.dataService._technicalRiskEvents[i].probability =
        this.technicalRisks[i].probability;
    }
    for (let i = 0; i < this.costRisks.length; i++) {
      this.dataService._costRiskEvents[i].probability =
        this.costRisks[i].probability;
    }
    for (let i = 0; i < this.plannedRisks.length; i++) {
      this.dataService._plannedRiskEvents[i].probability =
        this.plannedRisks[i].probability;
    }
    for (let i = 0; i < this.realizationRisks.length; i++) {
      this.dataService._realizationRiskEvents[i].probability =
        this.realizationRisks[i].probability;
    }
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
  }

  public getSummaryGrades() {
    this.technicalSummary.probability = this.getSummary(this.technicalRisks);
    this.costSummary.probability = this.getSummary(this.costRisks);
    this.plannedSummary.probability = this.getSummary(this.plannedRisks);
    this.realizationSummary.probability = this.getSummary(
      this.realizationRisks
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
    let summary = 0;
    for (let i = 0; i < risks.length; i++) {
      summary += risks[i].probability;
    }
    return summary;
  }
}
