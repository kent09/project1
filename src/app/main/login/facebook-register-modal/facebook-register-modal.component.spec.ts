import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookRegisterModalComponent } from './facebook-register-modal.component';

describe('FacebookRegisterModalComponent', () => {
  let component: FacebookRegisterModalComponent;
  let fixture: ComponentFixture<FacebookRegisterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookRegisterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
