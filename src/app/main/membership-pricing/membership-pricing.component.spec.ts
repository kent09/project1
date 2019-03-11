import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPricingComponent } from './membership-pricing.component';

describe('MembershipPricingComponent', () => {
  let component: MembershipPricingComponent;
  let fixture: ComponentFixture<MembershipPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
