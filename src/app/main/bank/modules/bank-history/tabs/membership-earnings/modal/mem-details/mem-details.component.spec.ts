import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemDetailsComponent } from './mem-details.component';

describe('MemDetailsComponent', () => {
  let component: MemDetailsComponent;
  let fixture: ComponentFixture<MemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
