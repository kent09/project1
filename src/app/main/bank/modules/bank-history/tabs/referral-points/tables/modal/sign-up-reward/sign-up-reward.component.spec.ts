import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpRewardComponent } from './sign-up-reward.component';

describe('SignUpRewardComponent', () => {
  let component: SignUpRewardComponent;
  let fixture: ComponentFixture<SignUpRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpRewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
