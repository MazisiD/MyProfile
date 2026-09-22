import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AboutEditor } from './about-editor';

describe('AboutEditor', () => {
  let component: AboutEditor;
  let fixture: ComponentFixture<AboutEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutEditor],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
