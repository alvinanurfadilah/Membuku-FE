import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isAuthenticated!: boolean;
  isAdmin!: boolean;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.isAuthenticated$.subscribe(
      (result) => (this.isAuthenticated = result)
    );
    this._authService.isAdmin$.subscribe((result) => (this.isAdmin = result));
  }

  onLogout() {
    this._authService.logout();
  }
}