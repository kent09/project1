import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardUnlinkComponent } from './hard-unlink.component';

describe('HardUnlinkComponent', () => {
  let component: HardUnlinkComponent;
  let fixture: ComponentFixture<HardUnlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardUnlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardUnlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
