import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SistAddComponent } from './sist-add.component';

describe('SistAddComponent', () => {
  let component: SistAddComponent;
  let fixture: ComponentFixture<SistAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SistAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SistAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
