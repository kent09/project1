import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnLeaderboardComponent } from './own-leaderboard.component';

describe('OwnLeaderboardComponent', () => {
  let component: OwnLeaderboardComponent;
  let fixture: ComponentFixture<OwnLeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnLeaderboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
