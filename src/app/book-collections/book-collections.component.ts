import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-book-collections',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './book-collections.component.html',
  styleUrl: './book-collections.component.css',
})
export class BookCollectionsComponent {}
