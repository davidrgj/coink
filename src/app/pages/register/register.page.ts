import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

// Interfaces
import { BasicData, PersonalInfo } from 'src/app/interfaces/personal-info.interface';

// Components
import { RegisterSuccessComponent } from './register-success/register-sucess.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  progress: string = '1';
  personalData: PersonalInfo = {};

  constructor(
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    const storedData = localStorage.getItem('registerData');
    if (storedData && storedData.length > 0) {
      this.personalData = JSON.parse(storedData);
    }
  }

  backButton() {
    if (this.progress === '1') {
      this.router.navigate(['/home']);
    } else {
      this.progress = String(Number(this.progress) - 1);
    }
  }

  getLabelProgress() {
    let label: string = "";

    if (this.progress === '1') label = "NÚMERO CELULAR";
    if (this.progress === '2') label = "DATOS DE CUENTA";
    if (this.progress === '3') label = "FINALIZAR";

    return label;

  }

  setSegmentActive(segment: string) {
    const segmentButton = document.getElementById(`segment-btn-${segment}`) as HTMLElement;
    setTimeout(() => segmentButton.classList.add('segment-button-checked'));
  }

  infoPhoneNumber(phoneNumber: string) {
    this.personalData.phoneNumber = phoneNumber;
    this.progress = '2';
    this.setSegmentActive('1');

    localStorage.setItem('registerData', JSON.stringify(this.personalData));
  }

  infoRegister(data: BasicData) {
    this.personalData.basicData = data;
    this.progress = '3';
    this.setSegmentActive('2');

    localStorage.setItem('registerData', JSON.stringify(this.personalData));
  }

  async infoAcceptConditions(acceptConditions: boolean) {
    this.personalData.acceptPolicies = acceptConditions;

    localStorage.setItem('registerData', JSON.stringify(this.personalData));

    const modal = await this.modalController.create({
      component: RegisterSuccessComponent,
      backdropDismiss: false,
    });

    modal.onDidDismiss().then(() => {
      console.log("Datos de registro => ", this.personalData);
      this.setLogs();


      this.personalData = {};
      this.progress = '1';
      localStorage.removeItem('registerData');
      this.router.navigate(['/home/logs']);
    })

    return await modal.present();
  }

  setLogs() {
    let logs = [];
    const storedLogs = localStorage.getItem('logs');
    if (storedLogs && storedLogs.length > 0) {
      logs = JSON.parse(storedLogs);
    }

    logs.push(this.personalData);
    localStorage.setItem('logs', JSON.stringify(logs));
  }
}
