import { Injectable, signal } from "@angular/core";
import { User } from "../../models";
import { HttpClient } from "@angular/common/http";

import { map, Observable, tap } from "rxjs";



@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private apiUrl = 'http://localhost:3030/users'

    private _isLoggedIn = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);

    public isLoggedIn = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    constructor(private httpClient: HttpClient) {
        const savedUser = localStorage.getItem('currentUser');
        const token = localStorage.getItem('accessToken');

        if (savedUser && token) {
            const user = JSON.parse(savedUser);
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
        }
    }


    login(email: string, password: string): Observable<User> {

        return this.httpClient.post<User>(`${this.apiUrl}/login`, { email, password }, {
            withCredentials: true
        }

        ).pipe(
            tap(user => {
                this._currentUser.set(user);
                this._isLoggedIn.set(true);
                localStorage.setItem('accessToken', user.accessToken);
                localStorage.setItem('currentUser', JSON.stringify({
                    _id: user._id,
                    email: user.email,
                    postedRecipes: user.postedRecipes || [],
                    likedRecipes: user.likedRecipes || [],
                }));
            })
        )
    }

    register(name: string, email: string, password: string, rePassword: string): Observable<User> {

        return this.httpClient.post<User>(`${this.apiUrl}/register`, {
            name,
            email,
            password,
            rePassword


        }, {
            withCredentials: true
        }).pipe(
            tap(user => {
                this._currentUser.set(user);
                this._isLoggedIn.set(true);
                localStorage.setItem('accessToken', user.accessToken);
                localStorage.setItem('currentUser', JSON.stringify({
                    _id: user._id,
                    email: user.email,
                    postedRecipes: user.postedRecipes || [],
                    likedRecipes: user.likedRecipes || [],
                }));
            })
        )

    }

    update(user: User): Observable<User> {

        const apiUser = <User>{
            _id: user._id,
            email: user.email,
            postedRecipes: user.postedRecipes,
            likedRecipes: user.likedRecipes
        }

        return this.httpClient.put<User>(`${this.apiUrl}/users/${user._id}`, apiUser, {
            withCredentials: true
        }

        ).pipe(
            tap(user => {
                this._currentUser.set(user);
                this._isLoggedIn.set(true);
                localStorage.setItem('accessToken', user.accessToken);
                localStorage.setItem('currentUser', JSON.stringify({
                    _id: user._id,
                    email: user.email,
                    postedRecipes: user.postedRecipes || [],
                    likedRecipes: user.likedRecipes || [],
                }));

            })
        )
    }

    logout(): Observable<void> {

        return this.httpClient.post<void>(`${this.apiUrl}/logout`, {}

        ).pipe(
            tap(() => {

                this._currentUser.set(null);
                this._isLoggedIn.set(false);
                localStorage.removeItem('currentUser');
                localStorage.removeItem('accessToken');

            })
        )


    }

    getCurrentUserId(): string | null {
        return this._currentUser()?._id || null

    }




}