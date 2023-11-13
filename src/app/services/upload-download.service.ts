import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadDownloadService {

  constructor(private http: HttpClient, private apiUrl: Constants) { }

  uploadDownloadApi: string = `${this.apiUrl.API_URL}/file`;

  downloadOwnerData(document: string): Observable<Blob> {
    return this.http.get(`${this.uploadDownloadApi}/${document}/download`, {
      responseType: 'blob'
    }).pipe(
      catchError(this.handleError<Blob>('getMoreOwnerData'))
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
  
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      /**this.messageService.add(`HeroService: ${message}`); */
      console.log(message);
    }
}
