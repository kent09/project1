import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPayoutComponent } from './blog-payout.component';

describe('BlogPayoutComponent', () => {
  let component: BlogPayoutComponent;
  let fixture: ComponentFixture<BlogPayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogPayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
