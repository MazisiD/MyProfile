import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Content } from '../../core/services/content';
import { AboutStat, EducationItem } from '../../core/models';

@Component({
  selector: 'app-about-editor',
  imports: [FormsModule, RouterLink],
  templateUrl: './about-editor.html',
  styleUrl: './about-editor.css',
})
export class AboutEditor {
  private readonly contentService = inject(Content);

  protected readonly bio = signal(this.contentService.about().bio);
  protected readonly skillsText = signal(this.contentService.about().skills.join(', '));
  protected readonly location = signal(this.contentService.about().location ?? '');
  protected readonly availability = signal(this.contentService.about().availability ?? '');
  protected readonly highlightsText = signal(this.contentService.about().highlights.join('\n'));
  protected readonly education = signal<EducationItem[]>(
    this.contentService.about().education.map(item => ({ ...item }))
  );
  protected readonly stats = signal<AboutStat[]>(
    (this.contentService.about().stats ?? []).map(item => ({ ...item }))
  );
  protected readonly isSaving = signal(false);
  protected readonly saved = signal(false);

  updateEducationField(index: number, field: keyof EducationItem, value: string): void {
    this.education.update(current =>
      current.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  addEducation(): void {
    this.education.update(current => [
      ...current,
      { institution: '', degree: '', period: '', note: '' }
    ]);
  }

  removeEducation(index: number): void {
    this.education.update(current => current.filter((_, i) => i !== index));
  }

  updateStatField(index: number, field: keyof AboutStat, value: string): void {
    this.stats.update(current =>
      current.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  addStat(): void {
    this.stats.update(current => [...current, { value: '', label: '' }]);
  }

  removeStat(index: number): void {
    this.stats.update(current => current.filter((_, i) => i !== index));
  }

  async save(): Promise<void> {
    this.isSaving.set(true);
    try {
      const skills = this.skillsText()
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);

      const highlights = this.highlightsText()
        .split('\n')
        .map(highlight => highlight.trim())
        .filter(highlight => highlight.length > 0);

      await this.contentService.saveAbout({
        bio: this.bio(),
        skills,
        location: this.location(),
        availability: this.availability(),
        highlights,
        education: this.education(),
        stats: this.stats()
      });
      this.saved.set(true);
    } finally {
      this.isSaving.set(false);
    }
  }
}

