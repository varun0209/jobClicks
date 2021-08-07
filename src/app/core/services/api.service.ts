import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) {
  }

  commonPostHandler(url: string, data: any): Observable<any> {
    return this.http.post(url, data, { headers: this.getToken() });
  }

  commonGetHandler(url: string): Observable<any> {
    return this.http.get(url, { headers: this.getToken() });
  }

  commonGetByHandler(url: string): Observable<any> {
    return this.http.get(url, { headers: this.getToken() });
  }

  commonPutHandler(url: string, data: any): Observable<any> {
    return this.http.put(url, data, { headers: this.getToken() });
  }

  commonDeleteHandler(url: string): Observable<any> {
    return this.http.delete(url, { headers: this.getToken() });
  }

  commonGetByWithoutHandler(url: string, data): Observable<any> {
    return this.http.get(url, { headers: data });
  }

  getToken(): any {
    return 'Authorization:Bearer ' + localStorage.getItem('accessToken')
  }
}
