import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.page.html',
  styleUrls: ['./third-step.page.scss'],
})
export class ThirdStepPage implements OnInit {

  @Output() formValue = new EventEmitter<boolean>();
  acceptConditions: boolean = false;

  constructor(
  ) { }

  ngOnInit() {
    const storedData = localStorage.getItem('registerData');
    if (storedData && storedData.length > 0) {
      const storedDataObj = JSON.parse(storedData);

      this.acceptConditions = storedDataObj.acceptPolicies ? storedDataObj.acceptPolicies : false;
    }

  }

  acceptConditionsCheck(event: CustomEvent) {
    this.acceptConditions = event.detail.checked;
  }

  finish() {
    if (this.acceptConditions === true) {
      this.formValue.emit(this.acceptConditions);
    }
  }

}
