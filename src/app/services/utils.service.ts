import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Interfaces
import { DocumentType } from '../interfaces/document-type.interface';
import { Gender } from '../interfaces/gender.interface';

//Environment
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private http: HttpClient
  ) { }

  getDocumentTypes(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>(`${environment.apiURL}/documentTypes${environment.apiKey}`);
  }

  getGenders(): Observable<Gender[]> {
    return this.http.get<Gender[]>(`${environment.apiURL}/genders${environment.apiKey}`);
  }
}
