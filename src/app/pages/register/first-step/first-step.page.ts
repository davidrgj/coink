import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.page.html',
  styleUrls: ['./first-step.page.scss'],
})
export class FirstStepPage implements OnInit {

  @Output() formValue = new EventEmitter<string>();

  form: FormGroup = this.formBuilder.group({});
  numericKeyboard: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    });

    const storedData = localStorage.getItem('registerData');
    if (storedData && storedData.length > 0) {
      const storedDataObj = JSON.parse(storedData);

      this.form.patchValue({ phoneNumber: storedDataObj.phoneNumber ? storedDataObj.phoneNumber : '' });
    }
  }

  addDigit(number: number) {
    const phoneNumberControl = this.form.get('phoneNumber') as FormControl;

    if (phoneNumberControl.value.length >= 11) {
      return;
    }

    // Add format to phone number
    let format = '';
    if (phoneNumberControl.value.length === 3) {
      format = ' ';
    }

    phoneNumberControl.patchValue(phoneNumberControl.value + format + number);
  }

  deleteDigit() {
    const phoneNumberControl = this.form.get('phoneNumber') as FormControl;
    let amountRemove = -1;
    if (phoneNumberControl.value.length === 4) {
      amountRemove = -2;
    }

    phoneNumberControl.patchValue(phoneNumberControl.value.slice(0, amountRemove));
  }

  acceptForm() {
    if (this.form.invalid) return;

    this.formValue.emit(String(this.form.getRawValue().phoneNumber));
  }

}