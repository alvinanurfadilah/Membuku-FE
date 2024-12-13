import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Author } from '../authors.model';
import { AuthorService } from '../authors.service';
import { AuthorComponent } from './author/author.component';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [RouterLink, AuthorComponent, RouterOutlet],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css',
})
export class AuthorListComponent implements OnInit {
  authors!: Author[];
  isLoading: boolean = true;
  errorMessage?: string;

  destroyRef = inject(DestroyRef);
  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    this.loadAuthors();
  }

  updateList() {
    this.isLoading = true;
    this.loadAuthors();
  }

  private loadAuthors() {
    const subscription = this.authorService.getAllAuthors().subscribe({
      next: (authors) => {
        this.isLoading = false;
        this.authors = authors;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message;
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}