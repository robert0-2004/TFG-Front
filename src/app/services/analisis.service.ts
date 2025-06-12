import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Analisis } from '../models/analisis';

@Injectable({
  providedIn: 'root'
})
export class AnalisisService {
  private url = 'http://localhost:8080/analisis';

  constructor(private http: HttpClient) { }

  create(analisis: Analisis): Observable<Analisis> {
    return this.http.post<Analisis>(this.url, analisis);
  }

  getByUser(userId: number): Observable<Analisis[]> {
    return this.http.get<Analisis[]>(`${this.url}/user/${userId}`);
  }
}