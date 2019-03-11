import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingAnalyticComponent } from './voting-analytic.component';

describe('VotingAnalyticComponent', () => {
  let component: VotingAnalyticComponent;
  let fixture: ComponentFixture<VotingAnalyticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingAnalyticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingAnalyticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
