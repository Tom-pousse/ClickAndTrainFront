import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Acquire } from '../component/models/acquire';
import { Observable } from 'rxjs';
import { Param } from '../component/models/param';
import { Player } from '../component/models/player';

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

  createAcquire(acquire: Acquire): Observable<Acquire> {
    const headers = this.setHeaders();
    return this.http.post<Acquire>(`${this.baseApiUrl}/acquire`, acquire, {
      headers,
    });
  }

  updateAcquire(acquire: Acquire): Observable<Acquire> {
    const headers = this.setHeaders();
    return this.http.patch<Acquire>(
      `${this.baseApiUrl}/acquire/profil`,
      acquire,
      {
        headers,
      }
    );
  }
}
