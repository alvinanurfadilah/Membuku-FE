import { Injectable } from '@angular/core';
import { DUMMY_BOOKS } from '../dummy-data';
import { Book } from './book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private _books: Book[] = DUMMY_BOOKS;

  get books() {
    return [...this._books];
  }
}
