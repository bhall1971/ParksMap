import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';



// EndPoint for the Google Places API
const endpoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json'
//   })
// };

const apiKey = 'AIzaSyCsS7Mt9eKvM5KyeeH3ykIFr6nIzAaP9SM';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    /* Constructor initializer, notice the access modifier private 
    allievates you from having to declare class variable up above.

    angular injects HttpClient through constructor
    */
    private http: HttpClient
  ) {
  }

  private buildParkRequest(query: string) {
    // string interpolation
    return `query=${query}&type=park&key=${apiKey}`;
  }

  getParkData(searchCriteria) {
    // return this.http
    //   .jsonp(`${endpoint}${this.buildParkRequest(searchCriteria)}`, 'callback')
    //   .pipe(
    //     map(res => {
    //       return res;
    //     })
    //   );
    //return this.http.get(endpoint + this.buildParkRequest(searchCriteria)

    return this.http.get(`${endpoint}${this.buildParkRequest(searchCriteria)}`);

    // return this.http.get(endpoint + this.buildParkRequest(searchCriteria)).pipe(
    //   catchError(this.handleError)
    // );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

