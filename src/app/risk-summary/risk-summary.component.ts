import { Component } from '@angular/core';
import { RiskSummary } from '../riskSummary';
import { DataService } from '../dataService';
import { registerLocaleData } from '@angular/common';
import localeIT from '@angular/common/locales/it';

registerLocaleData(localeIT);

@Component({
  selector: 'app-risk-summary',
  templateUrl: './risk-summary.component.html',
  styleUrl: './risk-summary.component.css',
})
export class RiskSummaryComponent {
  public technicalSummary: RiskSummary;
  public technicalRisks: RiskSummary[];
  public costSummary: RiskSummary;
  public costRisks: RiskSummary[];
  public plannedSummary: RiskSummary;
  public plannedRisks: RiskSummary[];
  public realizationSummary: RiskSummary;
  public realizationRisks: RiskSummary[];
  public totalRiskNumber: number;

  constructor(private dataService: DataService) {
    this.technicalSummary = dataService._technicalRiskSummary;
    this.technicalRisks = [];
    if(dataService._technicalRiskPrices != null) {
      for (let i = 0; i < dataService._technicalRiskEvents.length; i++) {
        this.technicalRisks.push(
          new RiskSummary(dataService._technicalRiskEvents[i].name)
        );
        this.technicalRisks[i].probability =
        dataService._technicalRiskEvents[i].probability;
        this.technicalRisks[i].additionalPrice =
        dataService._technicalRiskPrices[i].additionalPrice;
      }
    }
    this.costSummary = dataService._costRiskSummary;
    this.costRisks = [];
    if(dataService._costRiskPrices != null) {
      for (let i = 0; i < dataService._costRiskEvents.length; i++) {
        this.costRisks.push(new RiskSummary(dataService._costRiskEvents[i].name));
        this.costRisks[i].probability =
        dataService._costRiskEvents[i].probability;
        this.costRisks[i].additionalPrice =
        dataService._costRiskPrices[i].additionalPrice;
      }
    }
    this.plannedSummary = dataService._plannedRiskSummary;
    this.plannedRisks = [];
    if(dataService._plannedRiskPrices != null) {
      for (let i = 0; i < dataService._plannedRiskEvents.length; i++) {
        this.plannedRisks.push(
          new RiskSummary(dataService._plannedRiskEvents[i].name)
        );
        this.plannedRisks[i].probability =
        dataService._plannedRiskEvents[i].probability;
        this.plannedRisks[i].additionalPrice =
        dataService._plannedRiskPrices[i].additionalPrice;
      }
    }
    this.realizationSummary = dataService._realizationRiskSummary;
    this.realizationRisks = [];
    if(dataService._realizationRiskPrices != null) {
      for (let i = 0; i < dataService._realizationRiskEvents.length; i++) {
        this.realizationRisks.push(
          new RiskSummary(dataService._realizationRiskEvents[i].name)
        );
        this.realizationRisks[i].probability =
        dataService._realizationRiskEvents[i].probability;
        this.realizationRisks[i].additionalPrice =
        dataService._realizationRiskPrices[i].additionalPrice;
      }
    }
    this.totalRiskNumber =
      this.technicalRisks.length +
      this.costRisks.length +
      this.plannedRisks.length +
      this.realizationRisks.length;
  }
}
