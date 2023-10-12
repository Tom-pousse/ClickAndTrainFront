import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acquire } from '../component/models/acquire';

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

  getProfilAcquire(): Observable<Acquire> {
    const headers = this.setHeaders();
    return this.http.get<Acquire>(`${this.baseApiUrl}/acquire/profil`, {
      headers,
    });
  }
  updateUpgradeLvl(acquisition: Acquire): Observable<Acquire> {
    const headers = this.setHeaders();
    // console.log('save', );
    return this.http.patch<Acquire>(
      `http://localhost:3000/api/acquire/profil`,
      acquisition,
      {
        headers,
      }
    );
  }
}
