import { Component, inject, signal } from '@angular/core';
import { Content } from '../../core/services/content';
import { formatInline, formatParagraphs } from '../../core/rich-text';
import { techIconUrl } from '../../core/tech-icons';

type ProjectTab = 'demo' | 'problem' | 'approach' | 'solution';

// Breaks a long-form description into short bullet points (split on sentence
// boundaries) so the tab content reads as scannable highlights instead of
// one dense paragraph. Falls back to a single bullet for short text.
function toHighlights(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map(sentence => sentence.trim())
    .filter(Boolean);
}

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  private readonly contentService = inject(Content);

  protected readonly projects = this.contentService.projects;
  protected readonly tabs: ProjectTab[] = ['demo', 'problem', 'approach', 'solution'];
  protected readonly techIcon = techIconUrl;
  protected readonly formatParagraphs = formatParagraphs;
  protected readonly formatInline = formatInline;
  protected readonly toHighlights = toHighlights;
  private readonly activeTabs = signal<Record<string, ProjectTab>>({});

  activeTab(projectId: string | undefined): ProjectTab {
    if (!projectId) return 'demo';
    return this.activeTabs()[projectId] ?? 'demo';
  }

  setTab(projectId: string | undefined, tab: ProjectTab): void {
    if (!projectId) return;
    this.activeTabs.update(tabs => ({ ...tabs, [projectId]: tab }));
  }
}

