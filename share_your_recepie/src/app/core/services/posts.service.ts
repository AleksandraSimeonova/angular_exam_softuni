import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe, Theme } from "../../models";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class RecipeService {

     private apiUrl = 'http://localhost:3030/data/recipes'; //check url

    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<Recipe[]> {
        return this.httpClient.get<Recipe[]>(this.apiUrl);
    }
}

///    getById(id: string): Observable<Recipe> {
///        return this.httpClient.get<Recipe>(`${this.apiUrl}/recipes/${id}`);
///    }
///
///    create(data: any): Observable<Recipe> {
///        return this.http.post<Recipe>(`${this.apiUrl}/recipes`, data, {
///            headers: this.authHeader()
///        });
///    }
///
///    update(id: string, data: any): Observable<Recipe> {
///        return this.http.put<Recipe>(`${this.apiUrl}/recipes/${id}`, data, {
///            headers: this.authHeader()
///        });
///    }
///
///    delete(id: string): Observable<void> {
///        return this.http.delete<void>(`${this.apiUrl}/recipes/${id}`, {
///            headers: this.authHeader()
///        });
///    }

 ///  private authHeader(): HttpHeaders {
 ///      const token = localStorage.getItem('token');
 ///      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
 ///  }

