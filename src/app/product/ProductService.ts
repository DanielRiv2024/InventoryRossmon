import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/products/getAll';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }

  createProduct(product: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<any>('http://localhost:8080/products/create', product, { headers });
  }

  updateProduct(id: number, product: any): Observable<HttpResponse<Object>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.put(`http://localhost:8080/products/update/${id}`, product, {
      headers: headers,
      observe: 'response' 
    });
  }
  
  deleteProduct(productId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<any>(`http://localhost:8080/products/delete/${productId}`, { headers: headers });
  }
  
}
