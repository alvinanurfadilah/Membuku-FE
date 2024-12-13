import { Component } from '@angular/core';
import { BookCollectionsComponent } from "../book-collections/book-collections.component";
import { BookHighlightsComponent } from "./book-highlights/book-highlights.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookCollectionsComponent, BookHighlightsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
