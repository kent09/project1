import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMembershipDataComponent } from './header-membership-data.component';

describe('HeaderMembershipDataComponent', () => {
  let component: HeaderMembershipDataComponent;
  let fixture: ComponentFixture<HeaderMembershipDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMembershipDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMembershipDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
