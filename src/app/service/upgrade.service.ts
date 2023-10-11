import { Injectable } from '@angular/core';
import { Upgrade } from '../component/models/upgrade';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpgradeService {
  private baseApiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  getUpgrade(): Observable<Upgrade[]> {
    const headers = this.setHeaders();
    console.log('je suis ici');

    return this.http.get<Upgrade[]>(`${this.baseApiUrl}/upgrade`, {
      headers,
    });
  }

  getOneUpgrade(): Observable<Upgrade> {
    const headers = this.setHeaders();
    return this.http.get<Upgrade>(`${this.baseApiUrl}/upgrade`, {
      headers,
    });
  }
}
