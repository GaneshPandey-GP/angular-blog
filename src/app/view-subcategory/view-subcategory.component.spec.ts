import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubcategoryComponent } from './view-subcategory.component';

describe('ViewSubcategoryComponent', () => {
  let component: ViewSubcategoryComponent;
  let fixture: ComponentFixture<ViewSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
