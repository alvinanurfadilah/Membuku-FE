import { Routes } from '@angular/router';
import { EditBookCollectionComponent } from './edit-book-collection/edit-book-collection.component';
import { BookCollectionListComponent } from './book-collection-list/book-collection-list.component';

export const bookCollectionRoutes: Routes = [
  { path: '', component: BookCollectionListComponent },
  {
    path: 'edit/:id',
    component: EditBookCollectionComponent,
  },
];
