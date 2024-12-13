import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BookCollectionComponent } from '../book-collection/book-collection.component';
import { BookCollectionService } from '../book-collection.service';
import { BookCollection } from '../book-collection.model';
import { JwtService } from '../../auth/jwt.service';

@Component({
  selector: 'app-book-collection-list',
  standalone: true,
  imports: [BookCollectionComponent],
  templateUrl: './book-collection-list.component.html',
  styleUrl: './book-collection-list.component.css',
})
export class BookCollectionListComponent implements OnInit {
  collectionBook!: BookCollection[];
  isLoading: boolean = true;
  errorMessage?: string;
  destroyRef = inject(DestroyRef);
  private _jwtService = inject(JwtService);
  constructor(private bookCollectionService: BookCollectionService) {}

  ngOnInit(): void {
    this.loadBookCollection();
  }

  updateList() {
    this.isLoading = true;
    this.loadBookCollection();
  }

  loadBookCollection() {
    const subsrciption = this.bookCollectionService
      .getBookCollectionByUsername(this._jwtService.getUsername())
      .subscribe({
        next: (bookCollection) => {
          this.isLoading = false;
          this.collectionBook = bookCollection;
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.message;
        },
      });

    this.destroyRef.onDestroy(() => subsrciption.unsubscribe());
  }
}
