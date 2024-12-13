import { Routes } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorFormComponent } from './author-form/author-form.component';

export const authorRoutes: Routes = [
  {
    path: '',
    component: AuthorListComponent,
  },
  {
    path: 'new',
    component: AuthorFormComponent,
  },
  {
    path: 'edit/:id',
    component: AuthorFormComponent,
  }
];