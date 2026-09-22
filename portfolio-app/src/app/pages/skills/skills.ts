import { Component, inject } from '@angular/core';
import { Content } from '../../core/services/content';
import { techIconUrl } from '../../core/tech-icons';

const CATEGORY_ICONS: { match: RegExp; icon: string }[] = [
  { match: /framework|tool/i, icon: '⚙️' },
  { match: /engineering/i, icon: '🔧' },
  { match: /database/i, icon: '🗄️' },
  { match: /practice/i, icon: '✏️' },
];

function categoryIcon(name: string): string {
  return CATEGORY_ICONS.find(entry => entry.match.test(name))?.icon ?? '📦';
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  private readonly contentService = inject(Content);

  protected readonly skills = this.contentService.skills;
  protected readonly techIcon = techIconUrl;
  protected readonly categoryIcon = categoryIcon;
}
