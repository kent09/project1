import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHardUnlinkComponent } from './request-hard-unlink.component';

describe('RequestHardUnlinkComponent', () => {
  let component: RequestHardUnlinkComponent;
  let fixture: ComponentFixture<RequestHardUnlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestHardUnlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestHardUnlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
