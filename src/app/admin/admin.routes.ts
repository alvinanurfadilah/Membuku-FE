import { Routes } from "@angular/router";
import { BookAdminComponent } from "./book-admin/book-admin.component";
import { AuthorsComponent } from "./authors/authors.component";

export const adminRoutes: Routes = [
    {
        path: '',
        redirectTo: 'authors',
        pathMatch: 'full',
    },
    {
        path: 'authors',
        component: AuthorsComponent,
        loadChildren: () => import('./authors/authors.routes').then((mod) => mod.authorRoutes)
    },
    {
        path: 'book-admin',
        component: BookAdminComponent,
        loadChildren: () => import('./book-admin/book-admin.routes').then((mod) => mod.bookAdminRoutes)
    }
]