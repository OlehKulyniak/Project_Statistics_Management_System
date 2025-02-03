import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RiskPlanningComponent } from './risk-planning/risk-planning.component';
import { RiskIdentificationComponent } from './risk-identification/risk-identification.component';
import { RiskIdentificationEventComponent } from './risk-identification-event/risk-identification-event.component';
import { RiskAnalysisComponent } from './risk-analysis/risk-analysis.component';
import { RiskSummaryComponent } from './risk-summary/risk-summary.component';
import { RiskAnalysisPriceComponent } from './risk-analysis-price/risk-analysis-price.component';

const routes: Routes = [
  {
    path: 'risk/identification/sources',
    component: RiskIdentificationComponent,
  },
  { path: 'risk/planning', component: RiskPlanningComponent },
  {
    path: 'risk/identification/events',
    component: RiskIdentificationEventComponent,
  },
  {
    path: 'risk/summary',
    component: RiskSummaryComponent,
  },
  {
    path: 'risk/analysis/probability',
    component: RiskAnalysisComponent,
  },
  {
    path: 'risk/analysis/price',
    component: RiskAnalysisPriceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
