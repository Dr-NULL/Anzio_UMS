import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SistAltComponent } from './sist-alt.component';

describe('SistAltComponent', () => {
  let component: SistAltComponent;
  let fixture: ComponentFixture<SistAltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SistAltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SistAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
