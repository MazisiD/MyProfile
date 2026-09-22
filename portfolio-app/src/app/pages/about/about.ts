import { Component, inject } from '@angular/core';
import { Content } from '../../core/services/content';
import { formatInline, formatParagraphs } from '../../core/rich-text';
import { techIconUrl } from '../../core/tech-icons';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  private readonly contentService = inject(Content);

  protected readonly about = this.contentService.about;
  protected readonly techIcon = techIconUrl;
  protected readonly formatParagraphs = formatParagraphs;
  protected readonly formatInline = formatInline;
}

