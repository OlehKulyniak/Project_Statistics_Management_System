import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiskSummaryComponent } from './risk-summary.component';

describe('RiskPlanningSummaryComponent', () => {
  let component: RiskSummaryComponent;
  let fixture: ComponentFixture<RiskSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RiskSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RiskSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
