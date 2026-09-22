import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomeEditor } from './home-editor';

describe('HomeEditor', () => {
  let component: HomeEditor;
  let fixture: ComponentFixture<HomeEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEditor],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
