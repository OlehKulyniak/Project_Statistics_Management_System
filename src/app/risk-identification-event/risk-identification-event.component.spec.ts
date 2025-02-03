import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskIdentificationEventComponent } from './risk-identification-event.component';

describe('RiskIdentificationEventComponent', () => {
  let component: RiskIdentificationEventComponent;
  let fixture: ComponentFixture<RiskIdentificationEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RiskIdentificationEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RiskIdentificationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
