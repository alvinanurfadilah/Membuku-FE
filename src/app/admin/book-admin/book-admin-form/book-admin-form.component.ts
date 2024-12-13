import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAdminService } from '../book-admin.service';
import { AuthorService } from '../../authors/authors.service';
import { Author } from '../../authors/authors.model';
import { environment } from '../../../app.config';
import { BookHighlightService } from '../../../home/book-highlights/book-highlight.service';

@Component({
  selector: 'app-book-admin-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-admin-form.component.html',
  styleUrl: './book-admin-form.component.css',
})
export class BookAdminFormComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  authorService = inject(AuthorService);
  bookHighlightService = inject(BookHighlightService);
  constructor(private bookService: BookAdminService) {}

  getAllAuthor!: Author[];

  form = new FormGroup({
    name: new FormControl<string | null>('', {
      validators: [Validators.required],
    }),
    cover: new FormControl<File | null>(null),
    releaseDate: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    authorId: new FormControl<number | null>(null),
    bookHighlight: new FormControl<boolean | null>(null),
    orderNumber: new FormControl<number | null>(null),
  });

  @Input({ required: true }) id!: number;

  previewUrl!: string;
  get noImage() {
    return 'assets/OIP.jpg';
  }

  // jika pada form ada input yang mengharuskan gambar atau file maka gunakan form data, bukan yang seperti dibawah ini
  // bookFormData: {
  //   id: number;
  //   name: string;
  //   cover: string;
  //   releaseDate: string;
  //   author: AuthorBook;
  // } = {
  //   id: this.id,
  //   name: '',
  //   cover: '',
  //   releaseDate: '',
  //   author: {
  //     id: 0,
  //     name: ''
  //   }
  // };

  formBookHighlight: {
    bookId: number;
    orderNumber: number;
  } = {
    bookId: 0,
    orderNumber: 0,
  };

  orderNumber?: boolean;
  onChangeOrderNumber() {
    if (this.form.controls.bookHighlight.value == true) {
      this.orderNumber = true;
    } else {
      this.orderNumber = false;
    }
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('name', this.form.value.name!);
      formData.append('cover', this.form.value.cover!);
      formData.append('releaseDate', this.form.value.releaseDate!);
      formData.append('authorId', this.form.value.authorId!.toString());

      if (this.id) {
        this.bookHighligh();
        // update
        this.bookService.editBook(this.id, formData).subscribe({
          next: (book) => {
            console.log('berhasil mengubah', book);
            this.router.navigate(['../../'], { relativeTo: this.route });
          },
          error: (err) => {
            console.log('gagal mengubah buku', err);
          },
        });
      } else {
        // insert
        this.bookService.newBook(formData).subscribe({
          next: (book) => {
            console.log('berhasil di tambahkan', book);
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (err) => {
            console.log('gagal menambahkan book', err);
          },
        });
      }
    }
  }

  bookHighligh() {
    if (this.form.value.bookHighlight == true) {
      this.bookHighlightService.getAllBookHighlight().subscribe({
        next: (bookHighlight) => {
          this.formBookHighlight.bookId = this.id;
          this.formBookHighlight.orderNumber =
            this.form.controls.orderNumber.value!;
          const existingBookHighlight = bookHighlight.find(
            (b) => b.bookId == this.id
          );
          if (!existingBookHighlight) {
            console.log(this.id);
            this.bookHighlightService
              .newBookHighlight(this.formBookHighlight)
              .subscribe();
          } else {
            this.bookHighlightService
              .editBookHighlight(this.id, this.formBookHighlight)
              .subscribe();
          }
        },
      });
    } else {
      this.bookHighlightService.getAllBookHighlight().subscribe({
        next: (book) => {
          if (book.find((b) => b.bookId == this.id)) {
            this.bookHighlightService.deleteBookHighlight(this.id).subscribe();
          }
        },
      });
    }
  }

  getIdBookHighlight!: number;
  getBookHighlight(): number {
    this.bookHighlightService.getBookHighlightById(this.id).subscribe({
      next: (book) => {
        return this.getIdBookHighlight = book.bookId!;
      },
    });
    return this.getIdBookHighlight;
  }

  ngOnInit(): void {
    this.getAuthor();

    if (this.id) {
      this.bookService.bookGetById(this.id).subscribe({
        next: (book) => {
          this.form.controls.name.setValue(book.name);
          this.form.controls.releaseDate.setValue(
            book.releaseDate.split('T')[0]
          );
          this.form.controls.authorId.setValue(book.author.id);
        },
      });

      this.bookHighlightService.getBookHighlightById(this.id).subscribe({
        next: (book) => {
          if (book.bookId == this.id) {
            this.form.controls.bookHighlight.setValue(true);
            this.orderNumber = this.form.controls.bookHighlight.value!;
            this.form.controls.orderNumber.setValue(book.orderNumber);
          } else {
            this.form.controls.bookHighlight.setValue(false);
          }
        },
        error: (err) => {
          this.form.controls.bookHighlight.setValue(false);
        },
      });
    }
  }

  getBookCover(id: number) {
    return `${environment.apiUrl}/books/${id}/cover`;
  }

  getAuthor() {
    this.authorService.getAllAuthors().subscribe({
      next: (author) => {
        this.getAllAuthor = author;
      },
    });
  }

  onCancel() {
    if (this.id) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  // image
  onFileChange(event: Event) {
    const file = event.target as HTMLInputElement;
    const coverFile = file.files![0];
    this.form.patchValue({
      cover: coverFile,
    });
    // untuk mengubah2 gambar sebelum disubmit
    this.previewUrl = URL.createObjectURL(coverFile);
  }
}
