import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { FirstStepPage } from './first-step/first-step.page';
import { SecondStepPage } from './second-step/second-step.page';
import { ThirdStepPage } from './third-step/third-step.page';
import { RegisterSuccessComponent } from './register-success/register-sucess.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RegisterPageRoutingModule
  ],
  declarations: [RegisterPage, FirstStepPage, SecondStepPage, ThirdStepPage, RegisterSuccessComponent]
})
export class RegisterPageModule {}
