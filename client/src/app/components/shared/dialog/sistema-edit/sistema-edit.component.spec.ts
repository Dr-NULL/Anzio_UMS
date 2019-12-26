import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaEditComponent } from './sistema-edit.component';

describe('SistemaEditComponent', () => {
  let component: SistemaEditComponent;
  let fixture: ComponentFixture<SistemaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SistemaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
