import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Content } from '../../core/services/content';
import { SocialLink } from '../../core/models';

@Component({
  selector: 'app-contact-editor',
  imports: [FormsModule, RouterLink],
  templateUrl: './contact-editor.html',
  styleUrl: './contact-editor.css',
})
export class ContactEditor {
  private readonly contentService = inject(Content);

  protected readonly email = signal(this.contentService.contactInfo().email);
  protected readonly phone = signal(this.contentService.contactInfo().phone ?? '');
  protected readonly location = signal(this.contentService.contactInfo().location);
  protected readonly socialLinks = signal<SocialLink[]>([
    ...this.contentService.contactInfo().socialLinks
  ]);
  protected readonly isSaving = signal(false);
  protected readonly saved = signal(false);
  protected readonly error = signal<string | null>(null);

  updateSocialLink(index: number, field: keyof SocialLink, value: string): void {
    this.socialLinks.update(links =>
      links.map((link, i) => (i === index ? { ...link, [field]: value } : link))
    );
  }

  addSocialLink(): void {
    this.socialLinks.update(links => [...links, { label: '', url: '' }]);
  }

  removeSocialLink(index: number): void {
    this.socialLinks.update(links => links.filter((_, i) => i !== index));
  }

  async save(): Promise<void> {
    this.isSaving.set(true);
    this.error.set(null);
    try {
      await this.contentService.saveContactInfo({
        email: this.email(),
        phone: this.phone(),
        location: this.location(),
        socialLinks: this.socialLinks()
      });
      this.saved.set(true);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Failed to save. Please try again.');
    } finally {
      this.isSaving.set(false);
    }
  }
}

