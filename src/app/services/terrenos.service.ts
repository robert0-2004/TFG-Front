import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Terreno } from '../models/terreno';
import { UserService } from './user.service'; 

@Injectable({
  providedIn: 'root'
})
export class TerrenosService {

  private url: string = 'http://localhost:8080/terrenos';

  constructor(private http: HttpClient, private userService: UserService) { }


  findMyTerrenosPageable(page: number): Observable<any> {
    const userId = this.userService.getUserIdFromToken();
    return this.http.get<any>(`${this.url}/mis-terrenos/${userId}/page/${page}`);
  }

create(terreno: Terreno, userId?: number): Observable<Terreno> {
  const id = userId ?? this.userService.getUserIdFromToken();
  if (!id) {
    throw new Error("Usuario no autenticado");
  }
  return this.http.post<Terreno>(this.url, { ...terreno, user: { id } });
}

findMyTerrenos(): Observable<Terreno[]> {
  const userId = this.userService.getUserIdFromToken(); // Obtener el ID del usuario autenticado
  if (!userId) {
    throw new Error("Usuario no autenticado");
  }
  return this.http.get<Terreno[]>(`${this.url}/mis-terrenos/${userId}`);
}


  update(terreno: Terreno): Observable<Terreno>{
    return this.http.put<Terreno>(`${this.url}/${terreno.id}`, terreno);
  }

  remove(terrenoId: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${terrenoId}`);
  }

  getTerreno(page: number, size: number = 10, term: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);
  
    if (term.trim() !== '') {
      params = params.set('term', term);
    }
  
    return this.http.get(`${this.url}/search`, { params });
  }

  getTerrenosByUserId(userId: number): Observable<Terreno[]> {
  return this.http.get<Terreno[]>(`${this.url}/mis-terrenos/${userId}`);
}

getTerrenosByUserIdPageable(userId: number, page: number, size: number = 5, term: string = ''): Observable<any> {
  let params = new HttpParams()
    .set('page', page)
    .set('size', size);
  if (term.trim() !== '') {
    params = params.set('term', term);
  }
  return this.http.get<any>(`${this.url}/mis-terrenos/${userId}/page/${page}`, { params });
}

   /**
   *Descarga el PDF
   * @param terrenoId ID del terreno
   */
   viewPdf(terrenoId: number): void {
    const url = `${this.url}/${terrenoId}/pdf?disposition=attachment`;
    window.location.href = url;
  }
}
