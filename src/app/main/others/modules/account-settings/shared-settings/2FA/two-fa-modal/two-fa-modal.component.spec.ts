import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFAModalComponent } from './two-fa-modal.component';

describe('TwoFAModalComponent', () => {
  let component: TwoFAModalComponent;
  let fixture: ComponentFixture<TwoFAModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoFAModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFAModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
