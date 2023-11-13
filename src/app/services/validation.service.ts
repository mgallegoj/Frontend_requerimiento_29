import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private http: HttpClient, private apiUrl: Constants) { }
  validationApi: string = `${this.apiUrl.API_URL}/validation`

  validateAll() {
    return this.http.patch(`${this.validationApi}/all`, {}).pipe(
      catchError(this.handleError)
    );
  }

  validateOne(idProperty: number) {
    return this.http.patch(`${this.validationApi}/${idProperty}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      return throwError('Ocurrió un error al intentar realizar la operación. Por favor, inténtalo de nuevo más tarde.');
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
      return throwError(error.error || 'Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde.');
    }
  }

}
