import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskPlanningComponent } from './risk-planning.component';

describe('RiskPlanningComponent', () => {
  let component: RiskPlanningComponent;
  let fixture: ComponentFixture<RiskPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RiskPlanningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RiskPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
