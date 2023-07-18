import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  endpoint: string = 'https://portfolio-back-restaurant.vercel.app/api/products';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  //Obtener todos los productos
  getProducts(): Observable<any> {
    let api = `${this.endpoint}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //Obtener producto por categoría
  getProductsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.endpoint}/category/${category}`)
  }

  //Obtener producto por nombre
  getProductsByName(name: string): Observable<any> {
    return this.http.get(`${this.endpoint}/name/${name}`)
  }

  //Crear producto
  createProduct(product: Product): Observable<any> {
    let api = `${this.endpoint}/create`;
    return this.http.post(api, product)
    .pipe(
      catchError(this.handleError)
    )
  };

  //Editar producto
  editProduct(product: Product, id: string ): Observable<any> {
    let api = `${this.endpoint}/edit/${id}`;
    return this.http.put(api, product)
    .pipe(
      catchError(this.handleError)
    )
  };

  //Eliminar producto
  deleteProduct(id: string): Observable<any> {
    let api = `${this.endpoint}/delete/${id}`;
    console.log(id);
    return this.http.delete(api)
    .pipe(
      catchError(this.handleError)
    )
  };

  // Gestión de errores
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
