import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecondStepPage } from './second-step.page';

describe('SecondStepPage', () => {
  let component: SecondStepPage;
  let fixture: ComponentFixture<SecondStepPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SecondStepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
