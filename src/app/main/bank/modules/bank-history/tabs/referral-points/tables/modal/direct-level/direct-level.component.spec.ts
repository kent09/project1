import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectLevelComponent } from './direct-level.component';

describe('DirectLevelComponent', () => {
  let component: DirectLevelComponent;
  let fixture: ComponentFixture<DirectLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
