import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Author } from './authors.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private _authorSubject = new BehaviorSubject<Author[]>([]);
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/authors`;

  constructor() {}

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl).pipe(
      tap((authors) => this._authorSubject.next(authors)),
      catchError((response) => {
        console.log(response.status);
        return throwError(() => new Error('gagal mengambil data author'));
      })
    );
  }

  newAuthor(authorFormData: { name: string }) {
    return this.http
      .post<Author>(this.apiUrl, authorFormData)
      .pipe(
        tap((author) =>
          this._authorSubject.next([...this._authorSubject.getValue(), author])
        )
      );
  }

  authorGetById(id: number) {
    return this.http.get<Author>(`${this.apiUrl}/${id}`);
  }

  editAuthor(id: number, authorFormData: { id: number; name: string }) {
    return this.http.put<Author>(`${this.apiUrl}/${id}`, authorFormData);
  }

  deleteAuthorById(id: number) {
    return this.http.delete<Author>(`${this.apiUrl}/${id}`);
  }
}