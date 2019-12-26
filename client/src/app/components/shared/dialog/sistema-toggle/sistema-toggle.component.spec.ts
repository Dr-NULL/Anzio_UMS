import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaToggleComponent } from './sistema-toggle.component';

describe('ToggleSistemaComponent', () => {
  let component: SistemaToggleComponent;
  let fixture: ComponentFixture<SistemaToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SistemaToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemaToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
