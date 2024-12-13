import { inject, Injectable } from '@angular/core';
import { BookCollection, BookReview } from './book-collection.model';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../app.config';
import { JwtService } from '../auth/jwt.service';

@Injectable({ providedIn: 'root' })
export class BookCollectionService {
  private _bookCollectionSubject = new BehaviorSubject<BookCollection[]>([]);
  private _http = inject(HttpClient);
  private _jwtService = inject(JwtService);
  private _apiUrl = `${environment.apiUrl}/UserCollections`;
  private _apiUrlReview = `${environment.apiUrl}/Reviews`;

  getBookCollectionByUsername(username: string | undefined): Observable<BookCollection[]> {
    return this._http.get<BookCollection[]>(`${this._apiUrl}/${username}`).pipe(
      tap((bookCollection) => this._bookCollectionSubject.next(bookCollection)),
      catchError(() => {
        return throwError(
          () => new Error('gagal mengambil data buku collection')
        );
      })
    );
  }

  bookCollectionGetById(username: string, bookId: number) {
    return this._http.get<BookCollection>(
      `${this._apiUrl}/${username}/${bookId}`
    );
  }

  newBookCollection(bookCollectionFormData: {
    username: string | undefined;
    bookId: number;
    readStatus: string;
    readDate: string;
  }) {
    return this._http
      .post<BookCollection>(this._apiUrl, bookCollectionFormData)
      .pipe(
        tap((bookCollection) =>
          this._bookCollectionSubject.next([
            ...this._bookCollectionSubject.getValue(),
            bookCollection,
          ])
        )
      );
  }

  editBookCollection(
    username: string | undefined,
    bookId: number,
    bookCollectionData: { readStatus: string; readDate: string }
  ) {
    return this._http.put<BookCollection>(
      `${this._apiUrl}/${username}/${bookId}`,
      bookCollectionData
    );
  }

  deletedBookCollection(username: string | undefined, bookId: number) {
    return this._http.delete<BookCollection>(
      `${this._apiUrl}/${username}/${bookId}`
    );
  }

  getReviewById(username: string, bookId: number): Observable<BookReview> {
    return this._http
      .get<BookReview>(`${this._apiUrlReview}/${username}/${bookId}`)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return throwError('Review not found');
          }
          return throwError(error);
        })
      );
  }

  addReview(ratingFormData: {
    username: string | undefined;
    bookId: number;
    rating: number;
    review1: string;
  }) {
    return this._http.post<BookReview>(`${this._apiUrlReview}`, ratingFormData);
  }

  editReview(
    username: string | undefined,
    bookId: number,
    ratingFormData: {
      rating: number;
      review1: string;
    }
  ) {
    console.log(ratingFormData);
    return this._http.put<BookReview>(
      `${this._apiUrlReview}/${username}/${bookId}`,
      ratingFormData

    );
  }

  deletedReview(username: string | undefined, bookId: number) {
    return this._http.delete<BookReview>(
      `${this._apiUrlReview}/${username}/${bookId}`
    );
  }

  resetRating(username: string, bookId: number, ratingFormData: {
    rating: number;
    review1: string;
  }) {
    return this._http
      .put<BookReview>(`${this._apiUrlReview}/${username}/${bookId}`, ratingFormData);
  }

  // private _bookCollections: BookCollection[] = DUMMY_USER_BOOKS;

  // private bookService = inject(BookService);

  // get bookCollections() {
  //   return [...this._bookCollections];
  // }

  // addRating(id: number, rating: 1 | 2 | 3 | 4 | 5) {
  //   const book = this._bookCollections.find((b) => b.id === id);
  //   if (!book) {
  //     console.log('book tidak di temukan dalam collection');
  //     return;
  //   }
  //   book.rating = rating;
  // }

  // resetRating(id: string) {
  //   const book = this._bookCollections.find((b) => b.id === id)!;
  //   book.rating = null;
  // }

  // addToCollection(bookId: string, readStatus: ReadStatus) {
  //   const existingCollection = this._bookCollections.find(
  //     (bc) => bc.id === bookId
  //   );
  //   if (existingCollection) {
  //     existingCollection.readStatus = readStatus;
  //     return;
  //   }
  //   this.addNewToCollection(bookId, readStatus);
  // }

  // addNewToCollection(bookId: string, readStatus: ReadStatus) {
  //   const book = this.bookService.books.find((b) => b.id === bookId)!;
  //   const currentDate = new Date().toString();
  //   this._bookCollections = [
  //     ...this._bookCollections,
  //     {
  //       id: book.id,
  //       name: book.name,
  //       cover: book.cover,
  //       author: book.author,
  //       avgRating: 4.5,
  //       readStatus: readStatus,
  //       rating: null,
  //       review: null,
  //       readDate: null,
  //       addedDate: currentDate,
  //     },
  //   ];
  // }

  // removeFromCollection(bookId: string) {
  //   const bookInCollection = this._bookCollections.find((b) => b.id === bookId);
  //   if (!bookInCollection) {
  //     console.log('Buku yang ingin di hapus dari daftar tidak di temukan');
  //     return;
  //   }
  //   const index = this._bookCollections.indexOf(bookInCollection);
  //   this._bookCollections.splice(index, 1);
  // }

  // addReview(id: string, bookReview: BookReview) {
  //   const book = this._bookCollections.find((b) => b.id === id)!;
  //   const index = this._bookCollections.indexOf(book);
  //   this._bookCollections[index] = { ...book, ...bookReview };
  // }
}
