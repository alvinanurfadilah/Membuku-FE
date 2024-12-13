import { Component, inject, Input, OnInit } from '@angular/core';
import { BookHighlight } from '../book-highlight.model';
import { DatePipe } from '@angular/common';
import { DropdownButtonComponent } from '../../../shared/components/dropdown-button/dropdown-button.component';
import { BookAdminService } from '../../../admin/book-admin/book-admin.service';
import {
  ReadStatus,
  readStatusesLabel,
} from '../../../book-collections/book-collection.model';
import { BookCollectionService } from '../../../book-collections/book-collection.service';
import { JwtService } from '../../../auth/jwt.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { BookComponent } from '../../../admin/book-admin/book-admin-list/book/book.component';
import { BookHighlightService } from '../book-highlight.service';

@Component({
  selector: 'app-book-highlight',
  standalone: true,
  imports: [DatePipe, DropdownButtonComponent],
  templateUrl: './book-highlight.component.html',
  styleUrl: './book-highlight.component.css',
})
export class BookHighlightComponent implements OnInit {
  @Input({ required: true }) bookHighlight!: BookHighlight;
  readStatuses: { text: string; value: ReadStatus }[] = readStatusesLabel;
  imagePath?: string;

  private _bookAdminService = inject(BookAdminService);
  private _bookCollectionService = inject(BookCollectionService);
  private _roueter = inject(Router);
  private _jwtService = inject(JwtService);
  username = this._jwtService.getUsername();

  bookCollectionForm: {
    username: string | undefined;
    bookId: number;
    readStatus: string;
    readDate: string;
  } = {
    username: this.username,
    bookId: 0,
    readStatus: '',
    readDate: '',
  };

  ngOnInit(): void {
    this._bookAdminService
      .getCover(this.bookHighlight.bookId!)
      .subscribe((cover) => {
        this.imagePath = cover;
      });
  }

  onAddToCollection(readStatus: ReadStatus) {
    const getBookCollection = this._bookCollectionService
      .getBookCollectionByUsername(this.username)
      .subscribe((bookCollection) => {
        const bookExist = bookCollection.some(
          (book) => book.bookId === this.bookHighlight.bookId
        );

        if (!bookExist) {
          this.bookCollectionForm.bookId = this.bookHighlight.bookId!;
          this.bookCollectionForm.readStatus = readStatus;
          this.bookCollectionForm.readDate = new Date()
            .toISOString()
            .split('T')[0];
          this._bookCollectionService
            .newBookCollection(this.bookCollectionForm)
            .subscribe({
              next: (bookCollection) => {
                console.log(bookCollection);
                window.alert(`berhasil menambahkan kedalam koleksi`);
                this._roueter.navigate(['koleksi']);
              },
            });
        } else {
          window.alert('buku sudah ada dalam koleksi');
        }
      });
  }
}
