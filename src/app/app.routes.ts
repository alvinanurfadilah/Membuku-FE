import { Router, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookCollectionsComponent } from './book-collections/book-collections.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { map } from 'rxjs';
import { UnauthorizeComponent } from './unauthorize/unauthorize.component';

export const routes: Routes = [
  { path: 'beranda', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [
      () => {
        const router = inject(Router);
        return inject(AuthService).isAuthenticated$.pipe(
          map((isAuthenticated) => {
            if (isAuthenticated) {
              router.navigate(['']);
              return false;
            } else {
              return true;
            }
          })
        );
      },
    ],
  },
  {
    path: 'daftar',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (mod) => mod.RegisterComponent
      ),
  },
  {
    path: 'koleksi',
    component: BookCollectionsComponent,
    loadChildren: () =>
      import('./book-collections/book-collection.routes').then(
        (mod) => mod.bookCollectionRoutes
      ),
    canActivate: [
      () => {
        const router = inject(Router);
        return inject(AuthService).isAuthenticated$.pipe(
          map((isAuthenticated) => {
            if (!isAuthenticated) {
              router.navigate(['']);
              return false;
            } else {
              return true;
            }
          })
        );
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () =>
      import('./admin/admin.routes').then((mod) => mod.adminRoutes),
    canActivate: [
      () => {
        const router = inject(Router);
        return inject(AuthService).currentUser$.pipe(
          map((u) => {
            u?.role === 'Admin';
            if (u?.role.toLowerCase() === 'Admin'.toLowerCase()) {
              return true;
            } else {
              router.navigate(['unauthorize']);
              return false;
            }
          })
        );
      },
    ],
  },
  {
    path: 'unauthorize',
    component: UnauthorizeComponent,
  },
];
