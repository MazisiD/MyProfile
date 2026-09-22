import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Content } from '../../core/services/content';
import { ExperienceItem } from '../../core/models';

type NewExperience = Omit<ExperienceItem, 'id'>;

const EMPTY_NEW_ITEM: NewExperience = {
  role: '',
  company: '',
  location: '',
  period: '',
  employmentType: '',
  description: '',
  order: 0,
  tech: [],
  current: false
};

@Component({
  selector: 'app-experience-editor',
  imports: [FormsModule, RouterLink],
  templateUrl: './experience-editor.html',
  styleUrl: './experience-editor.css',
})
export class ExperienceEditor {
  private readonly contentService = inject(Content);

  protected readonly experience = this.contentService.experience;
  protected readonly newItem = signal<NewExperience>({ ...EMPTY_NEW_ITEM });
  protected readonly isSaving = signal(false);

  updateItemField(
    item: ExperienceItem,
    field: keyof ExperienceItem,
    value: string | number | boolean
  ): void {
    (item as unknown as Record<string, unknown>)[field] = value;
  }

  updateNewField(field: keyof NewExperience, value: string | number | boolean): void {
    this.newItem.update(current => ({ ...current, [field]: value }));
  }

  techText(item: ExperienceItem): string {
    return (item.tech ?? []).join(', ');
  }

  setTech(item: ExperienceItem, value: string): void {
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

  async saveItem(item: ExperienceItem): Promise<void> {
    if (!item.id) return;
    this.isSaving.set(true);
    try {
      await this.contentService.updateExperience(item.id, {
        role: item.role,
        company: item.company,
        location: item.location ?? '',
        period: item.period,
        employmentType: item.employmentType ?? '',
        description: item.description,
        order: item.order,
        tech: item.tech ?? [],
        current: item.current ?? false
      });
    } finally {
      this.isSaving.set(false);
    }
  }

  async deleteItem(item: ExperienceItem): Promise<void> {
    if (!item.id) return;
    await this.contentService.deleteExperience(item.id);
  }

  async addItem(): Promise<void> {
    if (!this.newItem().role || !this.newItem().company) return;
    this.isSaving.set(true);
    try {
      await this.contentService.addExperience(this.newItem());
      this.newItem.set({ ...EMPTY_NEW_ITEM });
    } finally {
      this.isSaving.set(false);
    }
  }
}

