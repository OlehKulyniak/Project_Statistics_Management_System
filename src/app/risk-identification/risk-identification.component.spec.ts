import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiskIdentificationComponent } from './risk-identification.component';

describe('RiskIdentificationComponent', () => {
  let component: RiskIdentificationComponent;
  let fixture: ComponentFixture<RiskIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RiskIdentificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RiskIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
