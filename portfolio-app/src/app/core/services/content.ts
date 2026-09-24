import { Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { firestore, isFirebaseConfigured } from '../firebase';
import {
  AboutContent,
  ContactInfo,
  ExperienceItem,
  HomeContent,
  ProjectItem,
  SkillsContent
} from '../models';

const DEFAULT_HOME: HomeContent = {
  name: 'Your Name',
  title: 'Software Developer',
  tagline: 'Building thoughtful, reliable software.',
  intro: 'Edit this introduction from the admin dashboard once you sign in.'
};

const DEFAULT_ABOUT: AboutContent = {
  bio: 'Write a short bio about yourself here. You can edit this from the admin dashboard.',
  skills: ['TypeScript', 'Angular', 'JavaScript'],
  highlights: [],
  education: [],
  stats: []
};

const DEFAULT_CONTACT_INFO: ContactInfo = {
  email: 'you@example.com',
  phone: '',
  location: 'Your City, Country',
  socialLinks: []
};

const DEFAULT_SKILLS: SkillsContent = {
  languages: [],
  categories: [],
  concepts: [],
  principles: []
};

/**
 * Reads and writes the site's editable content in Firestore.
 *
 * Public pages subscribe to the `home`/`about`/`experience`/`projects`/`contactInfo`
 * signals, which stay in sync in real time. Admin editors call the `save*` /
 * `add*` / `update*` / `delete*` methods to persist changes.
 */
@Injectable({
  providedIn: 'root',
})
export class Content {
  readonly home = signal<HomeContent>(DEFAULT_HOME);
  readonly about = signal<AboutContent>(DEFAULT_ABOUT);
  readonly contactInfo = signal<ContactInfo>(DEFAULT_CONTACT_INFO);
  readonly experience = signal<ExperienceItem[]>([]);
  readonly projects = signal<ProjectItem[]>([]);
  readonly skills = signal<SkillsContent>(DEFAULT_SKILLS);

  constructor() {
    if (!isFirebaseConfigured) return;

    onSnapshot(doc(firestore, 'content', 'home'), snap => {
      if (snap.exists()) this.home.set(snap.data() as HomeContent);
    });
    onSnapshot(doc(firestore, 'content', 'about'), snap => {
      if (snap.exists()) this.about.set(snap.data() as AboutContent);
    });
    onSnapshot(doc(firestore, 'content', 'contactInfo'), snap => {
      if (snap.exists()) this.contactInfo.set(snap.data() as ContactInfo);
    });
    onSnapshot(doc(firestore, 'content', 'skills'), snap => {
      // Spread over DEFAULT_SKILLS: older docs saved before a new field (e.g.
      // `principles`) existed won't have that key, and reading `.length` on
      // undefined would throw in the template.
      if (snap.exists()) this.skills.set({ ...DEFAULT_SKILLS, ...(snap.data() as Partial<SkillsContent>) });
    });
    onSnapshot(
      query(collection(firestore, 'experience'), orderBy('order', 'asc')),
      (snap: QuerySnapshot<DocumentData>) => {
        this.experience.set(
          snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<ExperienceItem, 'id'>) }))
        );
      }
    );
    onSnapshot(
      query(collection(firestore, 'projects'), orderBy('order', 'asc')),
      (snap: QuerySnapshot<DocumentData>) => {
        this.projects.set(
          snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<ProjectItem, 'id'>) }))
        );
      }
    );
  }

  saveHome(content: HomeContent): Promise<void> {
    return setDoc(doc(firestore, 'content', 'home'), content);
  }

  saveAbout(content: AboutContent): Promise<void> {
    return setDoc(doc(firestore, 'content', 'about'), content);
  }

  saveContactInfo(content: ContactInfo): Promise<void> {
    return setDoc(doc(firestore, 'content', 'contactInfo'), content);
  }

  saveSkills(content: SkillsContent): Promise<void> {
    return setDoc(doc(firestore, 'content', 'skills'), content);
  }

  addExperience(item: Omit<ExperienceItem, 'id'>): Promise<unknown> {
    return addDoc(collection(firestore, 'experience'), item);
  }

  updateExperience(id: string, item: Partial<ExperienceItem>): Promise<void> {
    return updateDoc(doc(firestore, 'experience', id), item);
  }

  deleteExperience(id: string): Promise<void> {
    return deleteDoc(doc(firestore, 'experience', id));
  }

  addProject(item: Omit<ProjectItem, 'id'>): Promise<unknown> {
    return addDoc(collection(firestore, 'projects'), item);
  }

  updateProject(id: string, item: Partial<ProjectItem>): Promise<void> {
    return updateDoc(doc(firestore, 'projects', id), item);
  }

  deleteProject(id: string): Promise<void> {
    return deleteDoc(doc(firestore, 'projects', id));
  }

  sendContactMessage(name: string, email: string, message: string): Promise<unknown> {
    return addDoc(collection(firestore, 'messages'), {
      name,
      email,
      message,
      createdAt: serverTimestamp()
    });
  }
}
