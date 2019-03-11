import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipBillingComponent } from './membership-billing.component';

describe('MembershipBillingComponent', () => {
  let component: MembershipBillingComponent;
  let fixture: ComponentFixture<MembershipBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
