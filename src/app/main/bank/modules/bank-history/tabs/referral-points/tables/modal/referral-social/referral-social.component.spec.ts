import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralSocialComponent } from './referral-social.component';

describe('ReferralSocialComponent', () => {
  let component: ReferralSocialComponent;
  let fixture: ComponentFixture<ReferralSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
