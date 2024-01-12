import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/auth/login'; // URL de tu API

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    // Prepara el cuerpo de la solicitud
    const body = {
      username: username,
      password: password
    };

    // Opcional: Define las cabeceras si es necesario
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Realiza la solicitud POST
    return this.http.post<any>(this.loginUrl, body, { headers });
  }
}
