import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Author } from '../../authors.model';
import { AuthorService } from '../../authors.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tr[app-author]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css',
})
export class AuthorComponent {
  @Input({ required: true }) author!: Author;
  @Output() deleted = new EventEmitter<void>();

  constructor(private authorService: AuthorService) {}

  onDelete(id: number) {
    const isDelete = window.confirm(
      `Apakah anda yakin ingin menghapus author ${this.author.name}?`
    );
    if (isDelete) {
      this.authorService.deleteAuthorById(id).subscribe({
        next: () => {
          window.alert('Berhasil menghapus author ' + this.author.name);
          this.deleted.emit();
        },
        error: (err) => {
          console.log(err);
          window.alert(err.message);
        },
      });
    }
  }
}
