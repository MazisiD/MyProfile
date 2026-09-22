import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Content } from '../../core/services/content';
import { ProjectItem } from '../../core/models';

type NewProject = Omit<ProjectItem, 'id'>;

const EMPTY_NEW_ITEM: NewProject = {
  title: '',
  demo: '',
  demoVideoUrl: '',
  problem: '',
  approach: '',
  solution: '',
  link: '',
  order: 0,
  tech: [],
  category: '',
  status: '',
  liveUrl: '',
  sourceUrl: ''
};

@Component({
  selector: 'app-projects-editor',
  imports: [FormsModule, RouterLink],
  templateUrl: './projects-editor.html',
  styleUrl: './projects-editor.css',
})
export class ProjectsEditor {
  private readonly contentService = inject(Content);

  protected readonly projects = this.contentService.projects;
  protected readonly newItem = signal<NewProject>({ ...EMPTY_NEW_ITEM });
  protected readonly isSaving = signal(false);

  updateItemField(item: ProjectItem, field: keyof ProjectItem, value: string | number): void {
    (item as unknown as Record<string, unknown>)[field] = value;
  }

  updateNewField(field: keyof NewProject, value: string | number): void {
    this.newItem.update(current => ({ ...current, [field]: value }));
  }

  techText(item: ProjectItem): string {
    return (item.tech ?? []).join(', ');
  }

  setTech(item: ProjectItem, value: string): void {
    item.tech = value
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0);
  }

  newTechText(): string {
    return this.newItem().tech.join(', ');
  }

  setNewTech(value: string): void {
    const tech = value
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);
    this.newItem.update(current => ({ ...current, tech }));
  }

  async saveItem(item: ProjectItem): Promise<void> {
    if (!item.id) return;
    this.isSaving.set(true);
    try {
      await this.contentService.updateProject(item.id, {
        title: item.title,
        demo: item.demo,
        demoVideoUrl: item.demoVideoUrl,
        problem: item.problem,
        approach: item.approach,
        solution: item.solution,
        link: item.link,
        order: item.order,
        tech: item.tech ?? [],
        category: item.category,
        status: item.status,
        liveUrl: item.liveUrl,
        sourceUrl: item.sourceUrl
      });
    } finally {
      this.isSaving.set(false);
    }
  }

  async deleteItem(item: ProjectItem): Promise<void> {
    if (!item.id) return;
    await this.contentService.deleteProject(item.id);
  }

  async addItem(): Promise<void> {
    if (!this.newItem().title) return;
    this.isSaving.set(true);
    try {
      await this.contentService.addProject(this.newItem());
      this.newItem.set({ ...EMPTY_NEW_ITEM });
    } finally {
      this.isSaving.set(false);
    }
  }
}

