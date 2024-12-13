import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { BookCollection } from '../book-collection.model';
import { BookCollectionService } from '../book-collection.service';
import { DatePipe } from '@angular/common';
import { RatingComponent } from '../../shared/components/rating/rating.component';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { BookAdminService } from '../../admin/book-admin/book-admin.service';
import { JwtService } from '../../auth/jwt.service';

@Component({
  selector: 'tr[book-collection]',
  standalone: true,
  imports: [DatePipe, TruncatePipe, RatingComponent, RouterLink],
  templateUrl: './book-collection.component.html',
  styleUrl: './book-collection.component.css',
})
export class BookCollectionComponent implements OnChanges {
  @Input({ required: true }) bookCollection!: BookCollection;
  @Output() deleted = new EventEmitter<void>();

  bookCollectionService = inject(BookCollectionService);
  private _bookAdminService = inject(BookAdminService);
  private _jwtService = inject(JwtService);
  username = this._jwtService.getUsername();
  imagePath?: string;

  ngOnChanges(): void {
    this._bookAdminService
      .getCover(this.bookCollection.bookId)
      .subscribe((cover) => {
        this.imagePath = cover;
      });
  }

  ratingForm: {
    username: string;
    bookId: number;
    rating: number;
    review1: string;
  } = {
    username: this.username,
    bookId: 0,
    rating: 0,
    review1: '',
  };

  onAddRating(rating: 1 | 2 | 3 | 4 | 5) {
    if (this.bookCollection.rating) {
      return;
    }
    this.ratingForm.bookId = this.bookCollection.bookId;
    this.ratingForm.rating = rating;
    this.ratingForm.review1 = '';

    this.bookCollectionService.addReview(this.ratingForm).subscribe({
      next: () => {
        this.deleted.emit();
      },
    });
  }

  onRemoveFromCollection(bookId: number) {
    const isDelete = window.confirm(
      `Apakah anda yakin ingin menghapus buku ${this.bookCollection.name} dari koleksi?`
    );
    if (isDelete) {
      const deletedReview = this.bookCollection.rating;
      if (deletedReview != null) {
        this.bookCollectionService
          .deletedReview(this.username, bookId)
          .subscribe();
      }

      this.bookCollectionService
        .deletedBookCollection(this.username, bookId)
        .subscribe({
          next: () => {
            window.alert(
              'Berhasil menghapus book collection ' + this.bookCollection.name
            );
            this.deleted.emit();
          },
          error: (err) => {
            console.log(err);
            window.alert(err.message);
          },
        });
    }
  }

  resetRating = 1;
  onClearRating() {
    this.ratingForm.rating = this.resetRating;
    this.bookCollectionService
      .resetRating(this.username, this.bookCollection.bookId, this.ratingForm)
      .subscribe({
        next: (book) => {
          this.deleted.emit();
        },
      });
  }
}
