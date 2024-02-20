import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-register-success',
    templateUrl: './register-sucess.component.html',
    styleUrls: ['./register-sucess.component.scss'],
})
export class RegisterSuccessComponent {
    constructor(private modalController: ModalController) { }

    dismiss() {
        this.modalController.dismiss();
    }
}
