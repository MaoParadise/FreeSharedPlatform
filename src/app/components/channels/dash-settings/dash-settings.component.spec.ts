import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashSettingsComponent } from './dash-settings.component';

describe('DashSettingsComponent', () => {
  let component: DashSettingsComponent;
  let fixture: ComponentFixture<DashSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
