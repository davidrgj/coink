import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirstStepPage } from './first-step.page';

describe('FirstStepPage', () => {
  let component: FirstStepPage;
  let fixture: ComponentFixture<FirstStepPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FirstStepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
