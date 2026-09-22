import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Content } from '../../core/services/content';
import { formatParagraphs } from '../../core/rich-text';
import { techIconUrl } from '../../core/tech-icons';
import { About } from '../about/about';
import { Experience } from '../experience/experience';
import { Projects } from '../projects/projects';
import { Skills } from '../skills/skills';
import { Contact } from '../contact/contact';

interface TerminalLine {
  prompt?: string;
  cmd?: string;
  out?: string;
  cursor?: boolean;
}

@Component({
  selector: 'app-home',
  imports: [About, Experience, Projects, Skills, Contact],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  private readonly contentService = inject(Content);

  protected readonly home = this.contentService.home;
  protected readonly contactInfo = this.contentService.contactInfo;
  protected readonly formatParagraphs = formatParagraphs;
  protected readonly techIcon = techIconUrl;

  protected readonly usernameSlug = computed(() => {
    const name = this.home().name?.trim();
    return name ? name.toLowerCase().split(/\s+/)[0] : 'guest';
  });

  protected readonly nameLines = computed(() => {
    const parts = (this.home().name ?? '').trim().split(/\s+/).filter(Boolean);
    return {
      first: parts[0] ?? '',
      rest: parts.slice(1).join(' ')
    };
  });

  private readonly commitHashes = ['a3f2c91', 'b8e1d44', 'c9a0f33', 'd41a6b8', 'e58f2c0'];

  protected readonly terminalLines = computed<TerminalLine[]>(() => {
    const h = this.home();
    const a = this.contentService.about();
    const slug = h.name ? h.name.trim().toLowerCase().replace(/\s+/g, '.') : 'guest';
    const highlights = a.highlights.length
      ? a.highlights.slice(0, 3)
      : ['Building something new', 'Shipping steady improvements', 'Refining the details'];

    return [
      { prompt: '~', cmd: 'whoami' },
      { out: slug },
      { prompt: '~', cmd: 'cat role.txt' },
      { out: h.title },
      { prompt: '~', cmd: 'git log --oneline -' + highlights.length },
      ...highlights.map((msg, i) => ({ out: `${this.commitHashes[i % this.commitHashes.length]} ${msg}` })),
      { prompt: '~', cmd: 'echo $STACK' },
      { out: a.skills.length ? a.skills.join(' ') : h.title },
      { prompt: '~', cmd: '', cursor: true },
    ];
  });

  protected readonly visibleCount = signal(0);
  protected readonly visibleLines = computed(() => this.terminalLines().slice(0, this.visibleCount()));
  private readonly timers: ReturnType<typeof setTimeout>[] = [];

  ngOnInit(): void {
    this.visibleCount.set(0);
    const total = this.terminalLines().length;
    for (let i = 1; i <= total; i++) {
      this.timers.push(setTimeout(() => this.visibleCount.set(i), i * 350));
    }
  }

  ngOnDestroy(): void {
    this.timers.forEach(clearTimeout);
  }

  socialUrl(label: string): string | undefined {
    return this.contactInfo().socialLinks.find(
      social => social.label.toLowerCase() === label.toLowerCase()
    )?.url;
  }
}

