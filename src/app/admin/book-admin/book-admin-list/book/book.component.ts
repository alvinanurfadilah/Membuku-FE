import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookAdmin } from '../../book-admin.model';
import { DatePipe } from '@angular/common';
import { AuthorService } from '../../../authors/authors.service';
import { BookAdminService } from '../../book-admin.service';
import { environment } from '../../../../app.config';
import { BookHighlightService } from '../../../../home/book-highlights/book-highlight.service';
import { BookHighlight } from '../../../../home/book-highlights/book-highlight.model';
import { BookHighlightComponent } from '../../../../home/book-highlights/book-highlight/book-highlight.component';
import { BookAdminListComponent } from '../book-admin-list.component';

@Component({
  selector: 'tr[app-book]',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnChanges {
  private _bookService = inject(BookAdminService);

  @Input({ required: true }) book!: BookAdmin;
  @Input() bookHighlight?: BookHighlight[];
  @Output() deleted = new EventEmitter<void>();
  dateFormat = 'dd-MM-yyyy';
  imagePath?: string;
  orderNumber?: number;

  constructor() {}

  ngOnChanges(): void {
    this._bookService.getCover(this.book.id).subscribe((cover) => {
      this.imagePath = cover;
    });

    const getBook = this.bookHighlight?.find((b) => b.bookId == this.book.id);
    if (getBook) {
      this.orderNumber = getBook.orderNumber;
    } else {
      this.orderNumber = null!;
    }
  }

  onDelete(id: number) {
    const isDelete = window.confirm(
      `Apakah anda yakin ingin menghapus buku ${this.book.name}?`
    );
    if (isDelete) {
      this._bookService.deleteBookById(id).subscribe({
        next: () => {
          window.alert('Berhasil menghapus buku ' + this.book.name);
          this.deleted.emit();
        },
        error: (err) => {
          console.log(err);
          window.alert(err.message);
        },
      });
    }
  }
}
