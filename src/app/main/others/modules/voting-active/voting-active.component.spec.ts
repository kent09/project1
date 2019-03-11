import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingActiveComponent } from './voting-active.component';

describe('VotingActiveComponent', () => {
  let component: VotingActiveComponent;
  let fixture: ComponentFixture<VotingActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
