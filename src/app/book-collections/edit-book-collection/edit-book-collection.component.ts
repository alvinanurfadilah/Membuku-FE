import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from '../../shared/components/rating/rating.component';
import { BookCollectionService } from '../book-collection.service';
import { BookCollectionComponent } from '../book-collection/book-collection.component';
import { Router } from '@angular/router';
import { environment } from '../../app.config';
import { JwtService } from '../../auth/jwt.service';
import { BookAdminService } from '../../admin/book-admin/book-admin.service';

@Component({
  selector: 'app-edit-book-collection',
  standalone: true,
  imports: [BookCollectionComponent, RatingComponent, ReactiveFormsModule],
  templateUrl: './edit-book-collection.component.html',
  styleUrl: './edit-book-collection.component.css',
})
export class EditBookCollectionComponent implements OnInit {
  @Input({ required: true }) id!: number;
  bookCollectionService = inject(BookCollectionService);
  bookService = inject(BookAdminService);
  router = inject(Router);
  jwtService = inject(JwtService);
  username = this.jwtService.getUsername();

  form = new FormGroup({
    rating: new FormControl<1 | 2 | 3 | 4 | 5 | null>(null),
    review1: new FormControl<string | null>(''),
    readDate: new FormControl<string | null>(''),
    readStatus: new FormControl<string>(''),
  });

  getBookEdit: {
    bookName: string;
    authorName: string;
  } = {
    bookName: '',
    authorName: '',
  };

  ratingForm: {
    username: string;
    bookId: number;
    rating: number;
    review1: string;
  } = {
    username: this.username,
    bookId: this.id,
    rating: 0,
    review1: '',
  };

  bookCollectionForm: { readStatus: string; readDate: string } = {
    readStatus: '',
    readDate: '',
  };

  getBookCover() {
    return `${environment.apiUrl}/books/${this.id}/cover`;
  }

  ngOnInit(): void {
    this.bookCollectionService
      .getBookCollectionByUsername(this.username)
      .subscribe({
        next: (book) => {
          const getBook = book.find((b) => b.bookId == this.id);
          let getReadDate = getBook?.readDate?.toString().split('T')[0];
          this.getBookEdit.bookName = getBook?.name!;
          this.getBookEdit.authorName = getBook?.author.name!;
          this.form.controls.rating.setValue(getBook?.rating!);
          this.form.controls.review1.setValue(getBook?.reviewNote!);
          this.form.controls.readDate.setValue(getReadDate!);
          this.form.value.readStatus = getBook?.readStatus;
        },
      });
  }

  setDateToNow() {
    let date = new Date().toISOString().split('T')[0];
    this.bookCollectionForm.readDate = date;
    this.form.patchValue({ readDate: date });
    console.log(this.form.value);
  }

  onRate(rate: 1 | 2 | 3 | 4 | 5) {
    this.ratingForm.rating = rate;
    this.form.patchValue({ rating: rate });
    console.log(this.form.value);
  }

  addReview() {
    this.ratingForm.rating = this.form.value.rating!;
    this.ratingForm.review1 = this.form.value.review1!;
    this.bookCollectionService.addReview(this.ratingForm).subscribe({
      next: () => {
        this.router.navigate(['/koleksi']);
      },
    });
  }

  editReview() {
    this.ratingForm.review1 = this.form.controls.review1.value!;
    this.ratingForm.rating = this.form.controls.rating.value!;
    this.bookCollectionService
      .editReview(this.username, this.id, this.ratingForm)
      .subscribe({
        next: () => {
          this.router.navigate(['/koleksi']);
        },
      });
  }

  onSubmit() {
    if (this.id) {
      console.log(this.form.value);
      this.bookCollectionService
        .getBookCollectionByUsername(this.username)
        .subscribe({
          next: (book) => {
            const getBook = book.find((b) => b.bookId == this.id);
            this.bookCollectionForm.readStatus = getBook?.readStatus!;
            this.bookCollectionForm.readDate =
              this.form.controls.readDate.value!;
            this.bookCollectionService
              .editBookCollection(
                this.username,
                this.id,
                this.bookCollectionForm
              )
              .subscribe();
            if (getBook?.rating == null && getBook?.reviewNote == null) {
              this.addReview();
            } else {
              this.editReview();
            }
          },
        });
    }
  }
}
