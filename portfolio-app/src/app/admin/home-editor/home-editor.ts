import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Content } from '../../core/services/content';
import { HomeContent } from '../../core/models';

@Component({
  selector: 'app-home-editor',
  imports: [FormsModule, RouterLink],
  templateUrl: './home-editor.html',
  styleUrl: './home-editor.css',
})
export class HomeEditor {
  private readonly contentService = inject(Content);

  protected readonly draft = signal<HomeContent>({ ...this.contentService.home() });
  protected readonly isSaving = signal(false);
  protected readonly saved = signal(false);

  updateField<K extends keyof HomeContent>(field: K, value: HomeContent[K]): void {
    this.draft.update(current => ({ ...current, [field]: value }));
    this.saved.set(false);
  }

  async save(): Promise<void> {
    this.isSaving.set(true);
    try {
      await this.contentService.saveHome(this.draft());
      this.saved.set(true);
    } finally {
      this.isSaving.set(false);
    }
  }
}

