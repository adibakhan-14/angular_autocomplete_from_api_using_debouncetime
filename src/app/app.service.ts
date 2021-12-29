import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, skipWhile, tap} from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServService {

  constructor(private http : HttpClient) { }

  // getProduct(): Observable<any[]>{
  //   return this.http.get<any>("/all?orientation=product").pipe(
  //     map(response =>
  //       response.isExecuted && response.data ? response.data : []
  //     ),
  //     catchError(error => of([]))
  //   )
  // }

  getData():Observable<any[]>{
    return this.http.get<any>('http://localhost:3000/status?status=returned')
      .pipe(
        map((response) => response.data.map(item => item['truck_reg']))
      )
  }
}