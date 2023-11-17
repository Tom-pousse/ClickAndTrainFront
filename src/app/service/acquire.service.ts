import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Acquire } from '../component/models/acquire';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AcquireService {
  private baseApiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  getAcquire(): Observable<Acquire[]> {
    const headers = this.setHeaders();
    return this.http.get<Acquire[]>(`${this.baseApiUrl}/acquire/profil`, {
      headers,
    });
  }
}
