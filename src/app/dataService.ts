import { Injectable } from '@angular/core';
import { RiskSummary } from './riskSummary';
import { RiskAnalysis } from './riskAnalysis';
import { RiskAnalysisPrice } from './riskAnalysisPrice';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public _techRiskSourceSummary: string;
  public _technicalRiskSummary: RiskSummary;
  public _technicalRiskSources: string[];
  public _techRiskEventSummary: RiskAnalysis;
  public _technicalRiskEvents: RiskAnalysis[];
  public _costRiskSourceSummary: string;
  public _costRiskSummary: RiskSummary;
  public _costRiskSources: string[];
  public _costRiskEventSummary: RiskAnalysis;
  public _costRiskEvents: RiskAnalysis[];
  public _planRiskSourceSummary: string;
  public _plannedRiskSummary: RiskSummary;
  public _plannedRiskSources: string[];
  public _planRiskEventSummary: RiskAnalysis;
  public _plannedRiskEvents: RiskAnalysis[];
  public _realRiskSourceSummary: string;
  public _realizationRiskSummary: RiskSummary;
  public _realizationRiskSources: string[];
  public _realRiskEventSummary: RiskAnalysis;
  public _realizationRiskEvents: RiskAnalysis[];
  public _techRiskSourceProbs: number[];
  public _costRiskSourceProbs: number[];
  public _planRiskSourceProbs: number[];
  public _realRiskSourceProbs: number[];
  public _technicalRiskSummaryPrice: RiskAnalysisPrice | null;
  public _technicalRiskPrices: RiskAnalysisPrice[] | null;
  public _costRiskSummaryPrice: RiskAnalysisPrice | null;
  public _costRiskPrices: RiskAnalysisPrice[] | null;
  public _plannedRiskSummaryPrice: RiskAnalysisPrice | null;
  public _plannedRiskPrices: RiskAnalysisPrice[] | null;
  public _realizationRiskSummaryPrice: RiskAnalysisPrice | null;
  public _realizationRiskPrices: RiskAnalysisPrice[] | null;
  public _riskSolutions: string[];
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

  constructor() {
    this._techRiskSourceSummary = 'Множина джерел появи технічних ризиків';
    this._technicalRiskSummary = new RiskSummary(
      'Множина настання технічних ризикових подій'
    );
    this._techRiskEventSummary = new RiskAnalysis(
      this._technicalRiskSummary.name
    );
    this._technicalRiskSources = [
      'функціональні характеристики ПЗ,',
      'характеристики якості ПЗ,',
      'характеристики надійності ПЗ,',
      'застосовність ПЗ,',
      'часова продуктивність ПЗ,',
      'супроводжуваність ПЗ,',
      'повторне використання компонент ПЗ;',
    ];
    let technicalRiskEventNames = [
      'затримки у постачанні обладнання, необхідного для підтримки процесу розроблення ПЗ;',
      'затримки у постачанні інструментальних засобів, необхідних для підтримки процесу розроблення ПЗ;',
      'небажання команди виконавців використовувати інструментальні засоби для підтримки процесу розроблення ПЗ;',
      'формування запитів на більш потужні інструментальні засоби розроблення ПЗ;',
      'відмова команди виконавців від CASE-засобів розроблення ПЗ;',
      'неефективність програмного коду, згенерованого CASE-засобами розроблення ПЗ;',
      'неможливість інтеграції CASE-засобів з іншими інструментальними засобами для підтримки процесу розроблення ПЗ;',
      'недостатня продуктивність баз(и) даних для підтримки процесу розроблення ПЗ;',
      'програмні компоненти, які використовують повторно в ПЗ, мають дефекти та обмежені функціональні можливості;',
      'швидкість виявлення дефектів у програмному коді є нижчою від раніше запланованих термінів;',
      'поява дефектних системних компонент, які використовують для розроблення ПЗ;',
    ];
    this._technicalRiskEvents = [].constructor(technicalRiskEventNames.length);
    for (let i = 0; i < technicalRiskEventNames.length; i++) {
      this._technicalRiskEvents[i] = new RiskAnalysis(
        technicalRiskEventNames[i]
      );
    }

    this._costRiskSourceSummary = 'Множина джерел появи вартісних ризиків';
    this._costRiskSummary = new RiskSummary(
      'Множина настання вартісних ризикових подій'
    );
    this._costRiskEventSummary = new RiskAnalysis(this._costRiskSummary.name);
    this._costRiskSources = [
      'обмеження сумарного бюджету на програмний проект,',
      'недоступна вартість реалізації програмного проекту,',
      'низька ступінь реалізму при оцінюванні витрат на програмний проект;',
    ];

    let costRiskNames = [
      'недо(пере)оцінювання витрат на реалізацію програмного проекту (надмірно низька вартість);',
      'фінансові ускладнення у компанії-замовника ПЗ;',
      'фінансові ускладнення у компанії-розробника ПЗ;',
      'змен(збіль)шення бюджету програмного проекта з ініціативи компанії-замовника ПЗ під час його реалізації;',
      'висока вартість виконання повторних робіт, необхідних для зміни вимог до ПЗ;',
      'реорганізація структурних підрозділів у компанії-замовника ПЗ;',
      'реорганізація команди виконавців у компанії-розробника ПЗ;',
    ];

    this._costRiskEvents = [].constructor(costRiskNames.length);
    for (let i = 0; i < costRiskNames.length; i++) {
      this._costRiskEvents[i] = new RiskAnalysis(costRiskNames[i]);
    }

    this._planRiskSourceSummary = 'Множина джерел появи планових ризиків';
    this._plannedRiskSummary = new RiskSummary(
      'Множина настання планових ризикових подій'
    );
    this._planRiskEventSummary = new RiskAnalysis(
      this._plannedRiskSummary.name
    );
    this._plannedRiskSources = [
      'властивості та можливості гнучкості внесення змін до планів життєвого циклу розроблення ПЗ,',
      'можливості порушення встановлених термінів реалізації етапів життєвого циклу розроблення ПЗ,',
      'низька ступінь реалізму при встановленні планів і етапів життєвого циклу розроблення ПЗ;',
    ];
    let plannedRiskNames = [
      'зміни графіка виконання робіт з боку замовника чи розробника ПЗ;',
      'порушення графіка виконання робіт з боку компанії-розробника ПЗ;',
      'потреба зміни користувацьких вимог до ПЗ з боку компанії-замовника ПЗ;',
      'потреба зміни функціональних вимог до ПЗ з боку компанії-розробника ПЗ;',
      'потреба виконання великої кількості повторних робіт, необхідних для зміни вимог до ПЗ;',
      'недо(пере)оцінювання тривалості етапів реалізації програмного проекту з боку компанії-замовника ПЗ;',
      'остаточний розмір ПЗ значно перевищує (менший від) заплановані(их) його характеристики;',
      'поява на ринку аналогічного ПЗ до виходу замовленого;',
      'поява на ринку більш конкурентоздатного ПЗ;',
    ];

    this._plannedRiskEvents = [].constructor(plannedRiskNames.length);
    for (let i = 0; i < plannedRiskNames.length; i++) {
      this._plannedRiskEvents[i] = new RiskAnalysis(plannedRiskNames[i]);
    }

    this._realRiskSourceSummary =
      'Множина джерел появи ризиків реалізації процесу управління програмним проектом';
    this._realizationRiskSummary = new RiskSummary(
      'Множина настання ризикових подій реалізації процесу управління програмним проектом'
    );
    this._realRiskEventSummary = new RiskAnalysis(
      this._realizationRiskSummary.name
    );
    this._realizationRiskSources = [
      'хибна стратегія реалізації програмного проекту,',
      'неефективне планування проекту розроблення ПЗ,',
      'неякісне оцінювання програмного проекту,',
      'прогалини в документуванні етапів реалізації програмного проекту,',
      'промахи в прогнозуванні результатів реалізації програмного проекту.',
    ];
    let realizationRiskNames = [
      'низький моральний стан персоналу команди виконавців ПЗ;',
      'низька взаємодія між членами команди виконавців ПЗ;',
      'пасивність керівника (менеджера) програмного проекту;',
      'недостатня компетентність керівника (менеджера) програмного проекту;',
      'незадоволеність замовника результатами етапів реалізації програмного проекту;',
      'недостатня кількість фахівців у команді виконавців ПЗ з необхідним професійним рівнем;',
      'хвороба провідного виконавця в найкритичніший момент розроблення ПЗ;',
      'одночасна хвороба декількох виконавців підчас розроблення ПЗ;',
      'неможливість організації необхідного навчання персоналу команди виконавців ПЗ;',
      'зміна пріоритетів у процесі управління програмним проектом;',
      'недо(пере)оцінювання необхідної кількості розробників (підрядників і субпідрядників) на етапах життєвого циклу розроблення ПЗ;',
      'недостатнє (надмірне) документування результатів на етапах реалізації програмного проекту;',
      'нереалістичне прогнозування результатів на етапах реалізації програмного проекту;',
      'недостатній професійний рівень представників від компанії-замовника ПЗ.',
    ];

    this._realizationRiskEvents = [].constructor(realizationRiskNames.length);
    for (let i = 0; i < realizationRiskNames.length; i++) {
      this._realizationRiskEvents[i] = new RiskAnalysis(
        realizationRiskNames[i]
      );
    }

    this._techRiskSourceProbs = [].constructor(
      this._technicalRiskSources.length
    );
    for (let i = 0; i < this._techRiskSourceProbs.length; i++) {
      this._techRiskSourceProbs[i] = Number(Math.random().toFixed(2));
    }
    //    this._techRiskEventProbs = [].constructor(this._technicalRiskEvents.length);
    for (let i = 0; i < this._technicalRiskEvents.length; i++) {
      this._technicalRiskEvents[i].probability = Number(
        Math.random().toFixed(2)
      );
    }
    this._costRiskSourceProbs = [].constructor(this._costRiskSources.length);
    for (let i = 0; i < this._costRiskSourceProbs.length; i++) {
      this._costRiskSourceProbs[i] = Number(Math.random().toFixed(2));
    }
    // this._costRiskEventProbs = [].constructor(this._costRiskEvents.length);
    for (let i = 0; i < this._costRiskEvents.length; i++) {
      this._costRiskEvents[i].probability = Number(Math.random().toFixed(2));
    }
    this._planRiskSourceProbs = [].constructor(this._plannedRiskSources.length);
    for (let i = 0; i < this._planRiskSourceProbs.length; i++) {
      this._planRiskSourceProbs[i] = Number(Math.random().toFixed(2));
    }
    // this._planRiskEventProbs = [].constructor(this._plannedRiskEvents.length);
    for (let i = 0; i < this._plannedRiskEvents.length; i++) {
      this._plannedRiskEvents[i].probability = Number(Math.random().toFixed(2));
    }
    this._realRiskSourceProbs = [].constructor(
      this._realizationRiskSources.length
    );
    for (let i = 0; i < this._realRiskSourceProbs.length; i++) {
      this._realRiskSourceProbs[i] = Number(Math.random().toFixed(2));
    }
    // this._realRiskEventProbs = [].constructor(
    //   this._realizationRiskEvents.length
    // );
    for (let i = 0; i < this._realizationRiskEvents.length; i++) {
      this._realizationRiskEvents[i].probability = Number(
        Math.random().toFixed(2)
      );
    }

    this._riskSolutions = new Array(
      this._technicalRiskEvents.length +
        this._costRiskEvents.length +
        this._plannedRiskEvents.length +
        this._realizationRiskEvents.length
    );

    this._technicalRiskSummaryPrice = null;
    this._technicalRiskPrices = null;
    this._costRiskSummaryPrice = null;
    this._costRiskPrices = null;
    this._plannedRiskSummaryPrice = null;
    this._plannedRiskPrices = null;
    this._realizationRiskSummaryPrice = null;
    this._realizationRiskPrices = null;

    this.techWeightedExpertGrades = [];
    this.costWeightedExpertGrades = [];
    this.planWeightedExpertGrades = [];
    this.realWeightedExpertGrades = [];

    this.technicalRiskWeight = this.getRiskWeight();
    this.costRiskWeight = this.getRiskWeight();
    this.plannedRiskWeight = this.getRiskWeight();
    this.realizationRiskWeight = this.getRiskWeight();

    this.expertRiskCoefficients = this.getExpertRiskCoefficients(0.1, 10);

    this.fillRiskBaseInformation(
      this._techRiskEventSummary,
      this._technicalRiskEvents,
      this.technicalRiskWeight,
      0.1,
      this.expertRiskCoefficients,
      this.techWeightedExpertGrades
    );

    this.fillRiskBaseInformation(
      this._costRiskEventSummary,
      this._costRiskEvents,
      this.costRiskWeight,
      0.1,
      this.expertRiskCoefficients,
      this.costWeightedExpertGrades
    );

    this.fillRiskBaseInformation(
      this._planRiskEventSummary,
      this._plannedRiskEvents,
      this.plannedRiskWeight,
      0.1,
      this.expertRiskCoefficients,
      this.planWeightedExpertGrades
    );

    this.fillRiskBaseInformation(
      this._realRiskEventSummary,
      this._realizationRiskEvents,
      this.realizationRiskWeight,
      0.1,
      this.expertRiskCoefficients,
      this.realWeightedExpertGrades
    );
  }

  public fillRiskBaseInformation(
    riskTypeSummary: RiskAnalysis,
    riskTypeRisks: RiskAnalysis[],
    riskTypeWeight: number,
    riskTypeStartCoef: number,
    expertRiskCoefficients: number[],
    riskTypeWeightedExpertGrades: number[]
  ): void {
    riskTypeSummary.grades = this.getWeightExpertCoefs(riskTypeWeight, 10);
    const riskTypeWeightedCoefSum = this.getSumOfElements(
      riskTypeSummary.grades
    );

    for (let i = 0; i < riskTypeRisks.length; i++) {
      riskTypeRisks[i].grades = this.getExpertcentralTableCells(
        riskTypeStartCoef,
        expertRiskCoefficients
      );
      riskTypeRisks[i].weightedGrades = this.getWeightedcentralTableCells(
        riskTypeRisks[i].grades,
        riskTypeSummary.grades,
        riskTypeRisks[i].probability
      );
      riskTypeWeightedExpertGrades.push(
        Number(
          (
            this.getSumOfElements(riskTypeRisks[i].weightedGrades) /
            riskTypeWeightedCoefSum
          ).toFixed(2)
        )
      );
    }
    riskTypeSummary.weightedGrades = [];
    for (let i = 0; i < riskTypeSummary.grades.length; i++) {
      const weightedExpertGrades = riskTypeRisks.map(
        (elem) => elem.weightedGrades[i]
      );
      riskTypeSummary.weightedGrades.push(
        Number(
          this.getWeightedExpertGrades(
            weightedExpertGrades,
            riskTypeSummary.grades[i]
          ).toFixed(2)
        )
      );
    }
  }

  public getRiskWeight(): number {
    return 5 * (Math.random() * 3);
  }

  public getWeightExpertCoefs(
    riskWeight: number,
    riskLength: number
  ): number[] {
    let centralTableCellArr = [];
    for (let i = 0; i < riskLength; i++) {
      let expertcentralTableCell =
        riskWeight + Math.random() * (12 - riskWeight);
      centralTableCellArr.push(
        expertcentralTableCell > 10
          ? 10
          : Number(expertcentralTableCell.toFixed(0))
      );
    }

    return centralTableCellArr;
  }

  public getSumOfElements(valueArr: number[]) {
    return valueArr.reduce((prevElem, nextElem) => prevElem + nextElem, 0);
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

  public getExpertRiskCoefficients(
    startGrade: number,
    riskLength: number
  ): number[] {
    const expertRiskCoefficients: number[] = [];
    for (let i = 0; i < riskLength; i++) {
      expertRiskCoefficients.push(startGrade + Math.random() * 0.7);
    }

    return expertRiskCoefficients;
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
