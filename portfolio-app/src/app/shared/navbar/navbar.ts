import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Content } from '../../core/services/content';

interface NavLink {
  fragment: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly contentService = inject(Content);

  protected readonly isMenuOpen = signal(false);

  protected readonly brandHandle = computed(() => {
    const name = this.contentService.home().name?.trim();
    return name ? `${name.toLowerCase().split(/\s+/)[0]}.dev` : 'portfolio';
  });

  protected readonly links: NavLink[] = [
    { fragment: 'home', label: 'Home' },
    { fragment: 'about', label: 'About' },
    { fragment: 'experience', label: 'Experience' },
    { fragment: 'projects', label: 'Projects' },
    { fragment: 'skills', label: 'Skills' },
    { fragment: 'contact', label: 'Contact' }
  ];

  toggleMenu(): void {
    this.isMenuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
