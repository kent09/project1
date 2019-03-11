import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevokeModalComponent } from './revoke-modal.component';

describe('RevokeModalComponent', () => {
  let component: RevokeModalComponent;
  let fixture: ComponentFixture<RevokeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevokeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevokeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
