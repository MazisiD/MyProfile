import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);

  protected readonly sections = [
    { path: '/kayi-kayi/home', label: 'Home Page' },
    { path: '/kayi-kayi/about', label: 'About Page' },
    { path: '/kayi-kayi/experience', label: 'Experience' },
    { path: '/kayi-kayi/projects', label: 'Projects' },
    { path: '/kayi-kayi/skills', label: 'Skills' },
    { path: '/kayi-kayi/contact', label: 'Contact Info' }
  ];

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/kayi-kayi/login']);
  }
}

