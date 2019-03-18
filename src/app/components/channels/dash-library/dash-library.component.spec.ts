import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLibraryComponent } from './dash-library.component';

describe('DashLibraryComponent', () => {
  let component: DashLibraryComponent;
  let fixture: ComponentFixture<DashLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
