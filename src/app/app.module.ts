import { NgModule, LOCALE_ID } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RiskIdentificationComponent } from './risk-identification/risk-identification.component';
import { RiskAnalysisComponent } from './risk-analysis/risk-analysis.component';
import { RiskPlanningComponent } from './risk-planning/risk-planning.component';
import { RiskSummaryComponent } from './risk-summary/risk-summary.component';
import { RiskIdentificationEventComponent } from './risk-identification-event/risk-identification-event.component';
import { RiskAnalysisPriceComponent } from './risk-analysis-price/risk-analysis-price.component';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';

registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    RiskIdentificationComponent,
    RiskAnalysisComponent,
    RiskPlanningComponent,
    RiskSummaryComponent,
    RiskIdentificationEventComponent,
    RiskAnalysisPriceComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    provideClientHydration(),
    { provide: LOCALE_ID, useValue: 'it-IT' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  name = 'Angular';
}
