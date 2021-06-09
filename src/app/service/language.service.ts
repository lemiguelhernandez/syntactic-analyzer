import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { LanguageModel } from '../model/language-model';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  fetch(language: string): Observable<HttpResponse<LanguageModel>> {
    return this.http.get<LanguageModel>(`assets/languages/${language}.json`, { observe: 'response' });
  }

}
