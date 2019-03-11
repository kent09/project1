import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingEndedComponent } from './voting-ended.component';

describe('VotingEndedComponent', () => {
  let component: VotingEndedComponent;
  let fixture: ComponentFixture<VotingEndedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingEndedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingEndedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
