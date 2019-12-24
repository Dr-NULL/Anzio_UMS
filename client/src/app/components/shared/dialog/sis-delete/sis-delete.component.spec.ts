import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SisDeleteComponent } from './sis-delete.component';

describe('SisDeleteComponent', () => {
  let component: SisDeleteComponent;
  let fixture: ComponentFixture<SisDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SisDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SisDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
