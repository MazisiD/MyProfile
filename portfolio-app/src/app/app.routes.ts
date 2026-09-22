import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'kayi-kayi/login',
    loadComponent: () => import('./admin/login/login').then(m => m.Login)
  },
  {
    path: 'kayi-kayi',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./admin/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'home',
        loadComponent: () => import('./admin/home-editor/home-editor').then(m => m.HomeEditor)
      },
      {
        path: 'about',
        loadComponent: () => import('./admin/about-editor/about-editor').then(m => m.AboutEditor)
      },
      {
        path: 'experience',
        loadComponent: () =>
          import('./admin/experience-editor/experience-editor').then(m => m.ExperienceEditor)
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./admin/projects-editor/projects-editor').then(m => m.ProjectsEditor)
      },
      {
        path: 'skills',
        loadComponent: () =>
          import('./admin/skills-editor/skills-editor').then(m => m.SkillsEditor)
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./admin/contact-editor/contact-editor').then(m => m.ContactEditor)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

