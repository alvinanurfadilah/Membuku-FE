import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-book-admin',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './book-admin.component.html',
  styleUrl: './book-admin.component.css',
})
export class BookAdminComponent {}
