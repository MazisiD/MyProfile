import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProjectsEditor } from './projects-editor';

describe('ProjectsEditor', () => {
  let component: ProjectsEditor;
  let fixture: ComponentFixture<ProjectsEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsEditor],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
