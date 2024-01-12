import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './Category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8080/categories/getAll';


  getAllCategories(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }

  createCategory(category: Category): Observable<Category> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>("http://localhost:8080/categories/create", category, {headers});
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(category)
    return this.http.put<Category>(`http://localhost:8080/categories/update`, category,{headers});
  }

  deleteCategory(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`http://localhost:8080/categories/delete/${id}`,{ headers: headers });
  }
}
