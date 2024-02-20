import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThirdStepPage } from './third-step.page';

describe('ThirdStepPage', () => {
  let component: ThirdStepPage;
  let fixture: ComponentFixture<ThirdStepPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ThirdStepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
