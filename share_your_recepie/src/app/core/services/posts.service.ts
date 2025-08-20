import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe, Theme, User } from "../../models";
import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class RecipeService {

  private apiUrl = 'http://localhost:3030/data/recipes'; //check url

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.apiUrl);

  }

  getOne(id: string): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`${this.apiUrl}/${id}`);

  }


  create(data: any): Observable<Recipe> {
    return this.httpClient.post<Recipe>(this.apiUrl, data, {
      headers: this.authHeader()

    });
  }

  private authHeader(): { [header: string]: string } {
    const token = localStorage.getItem('accessToken');
    return token ? { 'X-Authorization': token } : {};
  }


  update(id: string, data: any): Observable<Recipe> {
    return this.httpClient.put<Recipe>(`${this.apiUrl}/${id}`, data, {
      headers: this.authHeader()
    });
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authHeader()
    });
  }

}


///     return this.httpClient.post<Recipe>(`${this.apiUrl}`, data, {
///         headers: this.authHeader()
///     });























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

