import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthorService } from '../authors.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './author-form.component.html',
  styleUrl: './author-form.component.css',
})
export class AuthorFormComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  constructor(private authorService: AuthorService) {}

  form = new FormGroup({
    name: new FormControl<string | null>('', {
      validators: [Validators.required],
    }),
  });

  @Input({ required: true }) id!: number;
  authorFormData: { id: number; name: string } = { id: this.id, name: `` };

  onSubmit() {
    if (this.form.valid) {
      if (this.id) {
        // update
        this.authorService.editAuthor(this.id, this.authorFormData).subscribe({
          next: (auhtor) => {
            console.log('berhasil mengubah', auhtor);
            this.router.navigate(['../../'], { relativeTo: this.route });
          },
          error: (err) => {
            console.log('gagal mengubah author', err);
          },
        });
      } else {
        // insert
        this.authorService
          .newAuthor(this.form.value as { name: string })
          .subscribe({
            next: (author) => {
              console.log('berhasil di tambahkan', author);
              this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: (err) => {
              console.log('gagal menambahkan author', err);
            },
          });
      }
    }
  }

  ngOnInit(): void {
    if (this.id) {
      this.authorService.authorGetById(this.id).subscribe({
        next: (author) => {
          this.authorFormData.id = author.id;
          this.authorFormData.name = author.name;
        },
      });
    }
  }

  onCancel() {
    if (this.id) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
