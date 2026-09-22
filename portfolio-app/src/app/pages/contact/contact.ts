import { Component, inject } from '@angular/core';
import { Content } from '../../core/services/content';
import { techIconUrl } from '../../core/tech-icons';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly contentService = inject(Content);

  protected readonly contactInfo = this.contentService.contactInfo;
  protected readonly techIcon = techIconUrl;
}

