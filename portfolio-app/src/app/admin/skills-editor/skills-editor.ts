import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Content } from '../../core/services/content';
import { SkillCategory, SkillLanguage } from '../../core/models';

@Component({
  selector: 'app-skills-editor',
  imports: [FormsModule, RouterLink],
  templateUrl: './skills-editor.html',
  styleUrl: './skills-editor.css',
})
export class SkillsEditor {
  private readonly contentService = inject(Content);

  protected readonly languages = signal<SkillLanguage[]>(
    this.contentService.skills().languages.map(language => ({ ...language }))
  );
  protected readonly categories = signal<SkillCategory[]>(
    this.contentService.skills().categories.map(category => ({ ...category }))
  );
  protected readonly conceptsText = signal(this.contentService.skills().concepts.join(', '));
  protected readonly isSaving = signal(false);
  protected readonly saved = signal(false);

  categorySkillsText(category: SkillCategory): string {
    return category.skills.join(', ');
  }

  updateCategorySkills(index: number, value: string): void {
    const skills = value
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
    this.categories.update(current =>
      current.map((category, i) => (i === index ? { ...category, skills } : category))
    );
  }

  updateLanguageField(index: number, field: keyof SkillLanguage, value: string | number): void {
    this.languages.update(current =>
      current.map((language, i) => (i === index ? { ...language, [field]: value } : language))
    );
  }

  updateCategoryField(index: number, field: keyof SkillCategory, value: string): void {
    this.categories.update(current =>
      current.map((category, i) => (i === index ? { ...category, [field]: value } : category))
    );
  }

  addLanguage(): void {
    this.languages.update(current => [...current, { name: '', proficiency: 50 }]);
  }

  removeLanguage(index: number): void {
    this.languages.update(current => current.filter((_, i) => i !== index));
  }

  addCategory(): void {
    this.categories.update(current => [...current, { name: '', skills: [] }]);
  }

  removeCategory(index: number): void {
    this.categories.update(current => current.filter((_, i) => i !== index));
  }

  async save(): Promise<void> {
    this.isSaving.set(true);
    try {
      const concepts = this.conceptsText()
        .split(',')
        .map(concept => concept.trim())
        .filter(concept => concept.length > 0);

      await this.contentService.saveSkills({
        languages: this.languages(),
        categories: this.categories(),
        concepts
      });
      this.saved.set(true);
    } finally {
      this.isSaving.set(false);
    }
  }
}
