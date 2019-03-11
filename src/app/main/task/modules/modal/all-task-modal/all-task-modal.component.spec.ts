import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTaskModalComponent } from './all-task-modal.component';

describe('AllTaskModalComponent', () => {
  let component: AllTaskModalComponent;
  let fixture: ComponentFixture<AllTaskModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTaskModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
