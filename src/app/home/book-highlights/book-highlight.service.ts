import { inject, Injectable } from '@angular/core';
import { BookHighlight } from './book-highlight.model';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../app.config';

@Injectable({ providedIn: 'root' })
export class BookHighlightService {
  private _bookHighlightSubject = new BehaviorSubject<BookHighlight[]>([]);
  private _http = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/HighlightedBooks`;

  getAllBookHighlight(): Observable<BookHighlight[]> {
    return this._http.get<BookHighlight[]>(this._apiUrl).pipe(
      tap((bookHighlight) => this._bookHighlightSubject.next(bookHighlight)),
      catchError((response) => {
        return throwError(
          () => new Error('gagal mengambil data buku highlight')
        );
      })
    );
  }

  getBookHighlightById(bookId: number) {
    return this._http.get<BookHighlight>(`${this._apiUrl}/${bookId}`);
  }

  newBookHighlight(formData: {bookId: number, orderNumber: number}) {
    return this._http.post<BookHighlight>(this._apiUrl, formData);
  }

  editBookHighlight(bookId: number, formData: {bookId: number, orderNumber: number}) {
    return this._http.put<BookHighlight>(`${this._apiUrl}/${bookId}`, formData);
  }

  deleteBookHighlight(bookId: number) {
    return this._http.delete<BookHighlight>(`${this._apiUrl}/${bookId}`);
  }
}
