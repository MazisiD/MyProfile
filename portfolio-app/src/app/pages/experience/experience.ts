import { Component, computed, inject, signal } from '@angular/core';
import { Content } from '../../core/services/content';
import { formatInline } from '../../core/rich-text';
import { techIconUrl } from '../../core/tech-icons';

// Breaks a long-form description into short bullet points (split on sentence
// boundaries) so the timeline reads as scannable highlights instead of one
// dense paragraph. Falls back to a single "bullet" for short descriptions.
function toHighlights(description: string): string[] {
  return description
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map(sentence => sentence.trim())
    .filter(Boolean);
}

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  private readonly contentService = inject(Content);

  protected readonly experience = computed(() =>
    this.contentService.experience().map(job => ({
      ...job,
      highlights: toHighlights(job.description)
    }))
  );
  protected readonly techIcon = techIconUrl;
  protected readonly formatInline = formatInline;

  private readonly manualExpanded = signal<Map<string, boolean>>(new Map());

  protected isExpanded(job: { id?: string; role: string; current?: boolean }): boolean {
    const key = job.id || job.role;
    return this.manualExpanded().get(key) ?? !!job.current;
  }

  protected toggle(job: { id?: string; role: string; current?: boolean }): void {
    const key = job.id || job.role;
    const next = new Map(this.manualExpanded());
    next.set(key, !this.isExpanded(job));
    this.manualExpanded.set(next);
  }
}

