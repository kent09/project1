import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedConnectionsComponent } from './shared-connections.component';

describe('SharedConnectionsComponent', () => {
  let component: SharedConnectionsComponent;
  let fixture: ComponentFixture<SharedConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedConnectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
