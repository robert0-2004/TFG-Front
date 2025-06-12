import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  //Guarda la sesión en sessionStorage 
  private saveSession(token: string): void {
    sessionStorage.setItem('token', token);
  }

  //Carga la sesión almacenada en sessionStorage 
  private loadSession(): string | null {
    return sessionStorage.getItem('token');
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.loadSession() !== null;
  }

  //Obtener el id del token del ususario
  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del JWT
      if (!payload || !payload.userId) {
        console.error('El token no contiene el userId');
        return null;
      }
      return payload.userId; // Devuelve el userId del token
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  // Realiza el login y guarda la sesión si es exitoso 
  login({ email, password }: any): Observable<any> {
  return this.http.post<any>(`${this.url}/login`, { email, password }).pipe(
    tap(response => {
      if (response.token) {
        this.saveSession(response.token);
      }
    })
  );
}


  //Cierra sesión eliminando el token de sessionStorage 
  logout(): void {
    sessionStorage.removeItem('token');
  }

  //Crea un nuevo usuario 
  create(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }


  // Obtiene el token almacenado 
  getToken(): string | null {
    return this.loadSession();
  }

  //Obtener el rol del usuario desde el token
  getRolesFromToken(): string[] {
    const token = this.getToken();
    if (!token) return [];

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roles || [];
    } catch (error) {
      console.error('Error al decodificar los roles del token:', error);
      return [];
    }
  }


  isAdmin(): boolean {
    return this.getRolesFromToken().includes('ADMIN');
  }


    remove(userId: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${userId}`);
  }

    update(user: User): Observable<User>{
      return this.http.put<User>(`${this.url}/${user.id}`, user);
    }
getUserById(id: number): Observable<User> {
  return this.http.get<User>(`${this.url}/${id}`);
}

getUsuarios(page: number, size: number = 10, term: string = ''): Observable<any> {
  let params = new HttpParams()
    .set('page', page)
    .set('size', size);

  if (term.trim() !== '') {
    params = params.set('term', term);
  }

  return this.http.get(`${this.url}/search`, { params });
}

findAllPageableByRoleId(page: number, roleId: number): Observable<any> {
  return this.http.get<any>(
    `${this.url}/list/page/${page}?rol=${roleId}`
  );
}

}