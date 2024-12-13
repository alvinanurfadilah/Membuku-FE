import { Component, inject, OnInit } from '@angular/core';
import { BookAdmin } from '../book-admin.model';
import { BookAdminService } from '../book-admin.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookComponent } from './book/book.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { BookHighlight } from '../../../home/book-highlights/book-highlight.model';
import { BookHighlightService } from '../../../home/book-highlights/book-highlight.service';

@Component({
  selector: 'app-book-admin-list',
  standalone: true,
  imports: [RouterLink, BookComponent, ReactiveFormsModule],
  templateUrl: './book-admin-list.component.html',
  styleUrl: './book-admin-list.component.css',
})
export class BookAdminListComponent implements OnInit {
  books: BookAdmin[] = [];
  totalPages!: number;
  isLoading: boolean = true;
  errorMessage?: string;

  bookHighlight!: BookHighlight[];
  private _bookHighlightService = inject(BookHighlightService);

  _bookAdminService = inject(BookAdminService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  filterForm = new FormGroup({
    name: new FormControl<string | null>(null),
    authorName: new FormControl<string | null>(null),
    pageNumber: new FormControl<number>(1),
    pageSize: new FormControl<number>(10),
  });

  ngOnInit(): void {
    this.loadBooksWithParams();
    this.loadOnFilterChange();
  }

  private loadBook() {
    this.isLoading = true;
    const queryParams = this.route.snapshot.queryParams;
    this._bookAdminService
      .getAllBooks(queryParams)
      .subscribe((adminBooksPage) => {
        this.books = adminBooksPage.data;
        this.totalPages = adminBooksPage.totalPages;
        this.isLoading = false;
      });

    this._bookHighlightService.getAllBookHighlight().subscribe((book) => {
      this.bookHighlight = book;
    });
  }

  onPageChange() {
    const pageSize = this.filterForm.value.pageSize;
    if (!pageSize || pageSize <= 0 || pageSize >= 11) {
      this.filterForm.controls.pageSize.setValue(10);
    }
  }

  private loadBooksWithParams() {
    this.route.queryParams.subscribe((params) => {
      this.filterForm.patchValue(
        {
          name: params['name'] || null,
          authorName: params['authorName'] || null,
          pageNumber: +params['pageNumber'] || 1,
          pageSize: +params['pageSize'] || 10,
        },
        { emitEvent: false }
      );

      // Reload books whenever the query parameters change
      this.loadBook();
    });
  }

  private loadOnFilterChange() {
    this.isLoading = true;
    this.filterForm.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap((formValue) => {
          const queryParams = {
            name: formValue.name?.trim() || null,
            authorName: formValue.authorName?.trim() || null,
            pageNumber: formValue.pageNumber!,
            pageSize: formValue.pageSize || 10,
          };

          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: queryParams,
            queryParamsHandling: 'merge',
          });
        }),
        switchMap((formValue) => {
          const filters = {
            name: formValue.name?.trim() || null,
            authorName: formValue.authorName?.trim() || null,
            pageNumber: formValue.pageNumber!,
            pageSize: formValue.pageSize,
          };

          return this._bookAdminService.getAllBooks(filters);
        })
      )
      .subscribe((adminBookPage) => {
        this.books = adminBookPage.data;
        this.totalPages = adminBookPage.totalPages;
        this.isLoading = false;
      });
  }

  updateList() {
    this.isLoading = true;
    this.loadBook();
  }
}
