import { Component, OnDestroy } from '@angular/core';
import { DataService } from '../dataService';

@Component({
  selector: 'app-risk-planning',
  templateUrl: './risk-planning.component.html',
  styleUrl: './risk-planning.component.css',
})
export class RiskPlanningComponent implements OnDestroy {
  public riskEvents: string[];
  public riskSolutions: string[];
  public savedRiskSolutions: string[];

  constructor(private dataService: DataService) {
    this.riskEvents = [];
    for (let i = 0; i < dataService._technicalRiskEvents.length; i++) {
      this.riskEvents.push(dataService._technicalRiskEvents[i].name);
    }
    for (let costRiskEvent of dataService._costRiskEvents) {
      this.riskEvents.push(costRiskEvent.name);
    }
    for (let plannedRiskEvent of dataService._plannedRiskEvents) {
      this.riskEvents.push(plannedRiskEvent.name);
    }
    for (let realizationRiskEvent of dataService._realizationRiskEvents) {
      this.riskEvents.push(realizationRiskEvent.name);
    }
    this.riskSolutions = [
      'попереднє навчання членів проектного колективу;',
      'узгодження детального переліку вимог до ПЗ із замовником;',
      'внесення узгодженого переліку вимог до ПЗ замовника в договір;',
      'точне слідування вимогам замовника з узгодженого переліку вимог до ПЗ;',
      'попередні дослідження ринку;',
      'експертна оцінка програмного проекту досвідченим стороннім консультантом;',
      'консультації досвідченого стороннього консультанта;',
      'тренінг з вивчення необхідних інструментів розроблення ПЗ;',
      'укладання договору страхування;',
      'використання "шаблонних" рішень з вдалих попередніх проектів при управлінні програмним проектом;',
      'підготовка документів, які показують важливість даного проекту для досягнення фінансових цілей компанії-розробника;',
      "реорганізація роботи проектного колективу так, щоб обов'язки та робота членів колективу перекривали один одного;",
      'придбання (замовлення) частини компонент розроблюваного ПЗ;',
      'заміна потенційно дефектних компонент розроблюваного ПЗ придбаними компонентами, які гарантують якість виконання роботи;',
      'придбання більш продуктивної бази даних;',
      'використання генератора програмного коду;',
      'реорганізація роботи проектного колективу залежно від рівня труднощів виконання завдань та професійних рівнів розробників;',
      'повторне використання придатних компонент ПЗ, які були розроблені для інших програмних проектів;',
      'аналіз доцільності розроблення даного ПЗ.',
    ];
    this.savedRiskSolutions = this.dataService._riskSolutions;
  }

  public ngOnDestroy() {
    this.dataService._riskSolutions = this.savedRiskSolutions;
  }
}
