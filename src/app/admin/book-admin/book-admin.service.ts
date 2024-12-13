import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { BookAdmin } from './book-admin.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../app.config';
import { Author } from '../authors/authors.model';
import { Pagination } from '../pagination.model';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BookAdminService {
  private _bookAdminSubject = new BehaviorSubject<BookAdmin[]>([]);
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/books`;

  constructor() {}

  getAllBooks(params: Params): Observable<Pagination<BookAdmin[]>> {
    const activatedParams = Object.keys(params)
      .filter((key) => params[key] !== null)
      .reduce<Params>((activeParams, paramName) => {
        activeParams[paramName] = params[paramName];
        return activeParams;
      }, {});

    return this.http.get<Pagination<BookAdmin[]>>(`${this.apiUrl}`, {
      params: activatedParams,
    });
  }

  bookGetById(id: number) {
    return this.http.get<BookAdmin>(`${this.apiUrl}/${id}`);
  }

  getCover(id: number) {
    return this.http
      .get(`${this.apiUrl}/${id}/cover`, { responseType: 'blob' })
      .pipe(
        map((blob: Blob) => {
          const url = URL.createObjectURL(blob);
          return url;
        })
      );
  }

  newBook(bookFormData: FormData) {
    return this.http
      .post<BookAdmin>(this.apiUrl, bookFormData)
      .pipe(
        tap((book) =>
          this._bookAdminSubject.next([
            ...this._bookAdminSubject.getValue(),
            book,
          ])
        )
      );
  }

  editBook(id: number, formData: FormData) {
    formData.append('id', id.toString());
    return this.http.put<BookAdmin>(`${this.apiUrl}/${id}`, formData);
  }

  deleteBookById(id: number) {
    return this.http.delete<BookAdmin>(`${this.apiUrl}/${id}`);
  }
}
