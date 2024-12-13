import { Component, DestroyRef, inject } from '@angular/core';
import { BookHighlightComponent } from './book-highlight/book-highlight.component';
import { BookHighlight } from './book-highlight.model';
import { BookHighlightService } from './book-highlight.service';

@Component({
  selector: 'app-book-highlights',
  standalone: true,
  imports: [BookHighlightComponent],
  templateUrl: './book-highlights.component.html',
  styleUrl: './book-highlights.component.css',
})
export class BookHighlightsComponent {
  highlightedBook!: BookHighlight[];
  isLoading: boolean = true;
  errorMessage?: string;
  destroyRef = inject(DestroyRef);
  constructor(private bookHighlightService: BookHighlightService) {}

  ngOnInit(): void {
    const subsrciption = this.bookHighlightService
      .getAllBookHighlight()
      .subscribe({
        next: (bookHighlight) => {
          this.isLoading = false;
          this.highlightedBook = bookHighlight;
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.message;
        },
      });
    this.sortBookByOrderNumber();

    this.destroyRef.onDestroy(() => subsrciption.unsubscribe());
  }

  sortBookByOrderNumber(): void {
    this.bookHighlightService.getAllBookHighlight().subscribe({
      next: (bookHighlightList) => {
        this.highlightedBook = bookHighlightList;
        this.highlightedBook.sort((a, b) => {
          return a.orderNumber
            .toString()
            .localeCompare(b.orderNumber.toString());
        });
        console.log(this.highlightedBook);
        console.log(bookHighlightList);
      },
    });
  }
}
