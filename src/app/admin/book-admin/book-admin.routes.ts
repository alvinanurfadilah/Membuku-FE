import { Routes } from '@angular/router';
import { BookAdminListComponent } from './book-admin-list/book-admin-list.component';
import { BookAdminFormComponent } from './book-admin-form/book-admin-form.component';

export const bookAdminRoutes: Routes = [
  {
    path: '',
    component: BookAdminListComponent
  },
  {
    path: 'new',
    component: BookAdminFormComponent
  },
  {
    path: 'edit/:id',
    component: BookAdminFormComponent
  }
];
