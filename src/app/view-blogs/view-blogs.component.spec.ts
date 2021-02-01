import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBlogsComponent } from './view-blogs.component';

describe('ViewBlogsComponent', () => {
  let component: ViewBlogsComponent;
  let fixture: ComponentFixture<ViewBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBlogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
