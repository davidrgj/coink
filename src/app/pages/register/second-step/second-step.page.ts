import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { tap, catchError, finalize } from 'rxjs';

//Interfaces
import { DocumentType } from 'src/app/interfaces/document-type.interface';
import { Gender } from 'src/app/interfaces/gender.interface';

//Services
import { UtilsService } from 'src/app/services/utils.service';
import { CUSTOM_FIELD_NAMES, DOCUMENT_TYPES, GENDERS } from './constants/constans';
import { BasicData } from 'src/app/interfaces/personal-info.interface';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.page.html',
  styleUrls: ['./second-step.page.scss'],
})
export class SecondStepPage implements OnInit {

  @Output() formValue = new EventEmitter<BasicData>();

  form: FormGroup = this.formBuilder.group({});
  customFieldNames = CUSTOM_FIELD_NAMES;

  documentTypes: DocumentType[] = DOCUMENT_TYPES;
  genders: Gender[] = GENDERS; //Se inicializa, puesto que el endpoint de genders no está retornando valores (https://api.bancoink.biz/qa/signup/genders?apiKey=030106) 
  loadingDocumentTypes = false;
  loadingGenders = false;

  showPassword: boolean = false;
  showPasswordConfirmation: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      document_type: [null, [Validators.required]],
      document_number: [null, [Validators.required, Validators.minLength(6), Validators.pattern(/^\d+$/)]],
      document_issue_date: [null, [Validators.required]],
      birth_date: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      email_confirmation: [null, [Validators.required, Validators.email]],
      pin: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^\d+$/)]],
      pin_confirmation: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^\d+$/)]]
    }, {
      validators: [
        this.matchFieldsValidator('email', 'email_confirmation'),
        this.matchFieldsValidator('pin', 'pin_confirmation')
      ]
    });

    this.loadDocumentTypes();
    this.loadGenders();

    const storedData = localStorage.getItem('registerData');
    if (storedData && storedData.length > 0) {
      const storedDataObj = JSON.parse(storedData);

      this.form.patchValue(storedDataObj.basicData ? storedDataObj.basicData : null);
    }
  }

  loadDocumentTypes() {
    this.loadingDocumentTypes = true;
    this._utilsService.getDocumentTypes().pipe(
      tap((documentTypes: DocumentType[]) => {
        this.documentTypes = Array.isArray(documentTypes) ? documentTypes : this.documentTypes;
      }),
      catchError(error => {
        console.error('Error loading document types:', error);
        return this.documentTypes; // Retorna un array vacío (valor predeterminado) cuando hay una exception
      }),
      finalize(() => {
        this.loadingDocumentTypes = false;
      })
    ).subscribe();
  }

  loadGenders() {
    this.loadingGenders = true;
    this._utilsService.getGenders().pipe(
      tap((genders: Gender[]) => {
        this.genders = Array.isArray(genders) ? genders : this.genders;
      }),
      catchError(error => {
        console.error('Error loading document types:', error);
        return this.genders; // Retorna un array vacío (valor predeterminado) cuando hay una exception
      }),
      finalize(() => {
        this.loadingGenders = false;
      })
    ).subscribe();
  }

  matchFieldsValidator(field1: string, field2: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value1 = control.get(field1)?.value;
      const value2 = control.get(field2)?.value;

      if (value1 !== value2) {
        control.get(field2)?.setErrors({ 'match': true });
        return { 'match': true };
      } else {
        control.get(field2)?.setErrors(null);
        return null;
      }
    };
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowPasswordConfirmation() {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
  }

  getFieldName(controlName: string): string {
    return this.customFieldNames[controlName] || controlName;
  }

  validateFieldMessage(controlName: string): string {
    const control = this.form.get(controlName) as FormControl;

    if (!control || !control.dirty) {
      return ' '; // No mostrar mensaje de error si el control no existe o no ha sido tocado
    }

    if (control.hasError('required')) {
      return 'Este campo es obligatorio';
    }

    if (control.hasError('minlength')) {
      return `Este campo debe tener al menos ${control.errors!['minlength'].requiredLength} caracteres`;
    }

    if (control.hasError('maxlength')) {
      return `Este campo debe tener como máximo ${control.errors!['maxlength'].requiredLength} caracteres`;
    }

    if (control.hasError('email')) {
      return 'El formato de correo electrónico es inválido';
    }

    if (control.hasError('pattern')) {
      return `Este campo no cumple con el formato requerido`;
    }

    if (control.hasError('match')) {
      return `Este campo no coincide con el ${this.getFieldName(controlName)}`;
    }

    return ' '; // Devolver una cadena vacía si no hay errores
  }

  nextSlide() {
    if (this.form.invalid) return;

    this.formValue.emit(this.form.value);
  }
}
