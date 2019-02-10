import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDashboardComponent } from './no-dashboard.component';

describe('NoDashboardComponent', () => {
  let component: NoDashboardComponent;
  let fixture: ComponentFixture<NoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
