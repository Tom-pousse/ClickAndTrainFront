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

  // voir avec formateur pourquoi ici ça marche pas mais  dans le service player ok ... pb initialisation cascade ? conflit requete ?
  updateAcquireLvl(acquisition: Acquire): Observable<Acquire> {
    const headers = this.setHeaders();
    console.log('save', acquisition);
    return this.http.patch<Acquire>(
      `${this.baseApiUrl}/acquire/profil`,
      acquisition,
      {
        headers,
      }
    );
  }
}
