import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.loginUrl, body, { headers });
  }
}
