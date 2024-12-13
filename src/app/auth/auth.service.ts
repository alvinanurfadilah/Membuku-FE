import { inject, Injectable } from '@angular/core';
import { environment } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { LoginCredentials, RegisterCredentials, User } from './auth.model';
import { JwtService } from './jwt.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl = environment.apiUrl;
  http = inject(HttpClient);
  private _router = inject(Router);
  private _jwtService = inject(JwtService);

  private _userSubject = new BehaviorSubject<User[]>([]);
  private _userRegisterSubject = new BehaviorSubject<RegisterCredentials[]>([]);
  private _loggedInUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this._loggedInUserSubject.asObservable();
  isAuthenticated$ = this.currentUser$.pipe(map((u) => u !== null));
  isAdmin$ = this.currentUser$.pipe(map((u) => u?.role.toLowerCase() === "Admin".toLowerCase()));
  getUsername!: string | undefined;
  setUsername: Observable<string | undefined> = this.currentUser$.pipe(map((u) => this.getUsername = u?.username));

  private setAuth(user: User) {
    this._loggedInUserSubject.next(user);
    this._jwtService.setToken(user.token);
    this._jwtService.setUsername(user.username);
  }

  private purgeAuth() {
    this._loggedInUserSubject.next(null);
    this._jwtService.destroyToken();
  }

  register(credentials: RegisterCredentials) {
    return this.http
      .post<RegisterCredentials>(`${this.apiUrl}/Users`, credentials)
      .pipe(
        map((user) =>
          this._userRegisterSubject.next([
            ...this._userRegisterSubject.getValue(),
            user,
          ])
        )
      );
  }

  login(credentials: LoginCredentials): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/Auth/login`, credentials).pipe(
      tap((user) => {
        this.setAuth(user);
      })
    );
  }

  logout() {
    this.purgeAuth();
    this._router.navigate(['']);
  }

  getCurrentUser() {
    return this.http
      .get<User>(`${this.apiUrl}/Auth`)
      .pipe(tap((u) => this.setAuth(u)), catchError(() => of(this.logout())));
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/Users`).pipe(
      tap((user) => this._userSubject.next(user)),
      catchError((response) => {
        console.log(response.status);
        return throwError(() => new Error('Failed to fetch user data'));
      })
    );
  }
}
