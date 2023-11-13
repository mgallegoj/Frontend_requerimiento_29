import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Owner } from '../models/owner';
import { AllOwnerData } from '../models/allOwnerData';

@Injectable({
  providedIn: 'root'
})
export class OwnerConsultService {

  constructor(private http: HttpClient, private apiUrl: Constants) { }

  ownerConsultApi: string = `${this.apiUrl.API_URL}/consults`;
  
  getOwnerData(document: string): Observable<Owner[]> {
    return this.http.get<Owner[]>(`${this.ownerConsultApi}/${document}`)
    .pipe(
      catchError(this.handleError<Owner[]>('getOwnerData', []))
    );
  }
  
  getMoreOwnerData(document: string): Observable<AllOwnerData> {
    return this.http.get<AllOwnerData>(`${this.ownerConsultApi}/${document}/more`)
    .pipe(
      catchError(this.handleError<AllOwnerData>('getMoreOwnerData'))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    
    console.log(message);
  }

}
