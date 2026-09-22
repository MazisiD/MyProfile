import { Component, inject } from '@angular/core';
import { Content } from '../../core/services/content';
import { techIconUrl } from '../../core/tech-icons';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private readonly contentService = inject(Content);

  protected readonly contactInfo = this.contentService.contactInfo;
  protected readonly currentYear = new Date().getFullYear();
  protected readonly techIcon = techIconUrl;
}
