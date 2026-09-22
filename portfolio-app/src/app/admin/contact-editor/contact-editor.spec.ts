import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ContactEditor } from './contact-editor';

describe('ContactEditor', () => {
  let component: ContactEditor;
  let fixture: ComponentFixture<ContactEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactEditor],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
