import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedTaskComponent } from './related-task.component';

describe('RelatedTaskComponent', () => {
  let component: RelatedTaskComponent;
  let fixture: ComponentFixture<RelatedTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
