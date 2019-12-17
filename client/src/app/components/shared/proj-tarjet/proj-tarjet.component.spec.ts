import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjTarjetComponent } from './proj-tarjet.component';

describe('ProjTarjetComponent', () => {
  let component: ProjTarjetComponent;
  let fixture: ComponentFixture<ProjTarjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjTarjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjTarjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
