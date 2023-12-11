import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Param } from '../component/models/param';

@Injectable({
  providedIn: 'root',
})
export class ParamService {
  private baseApiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  getParam(): Observable<Param[]> {
    const headers = this.setHeaders();

    return this.http.get<Param[]>(`${this.baseApiUrl}/param`, {
      headers,
    });
  }
}
