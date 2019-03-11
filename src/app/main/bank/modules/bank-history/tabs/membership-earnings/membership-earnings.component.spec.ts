import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipEarningsComponent } from './membership-earnings.component';

describe('MembershipEarningsComponent', () => {
  let component: MembershipEarningsComponent;
  let fixture: ComponentFixture<MembershipEarningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipEarningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
