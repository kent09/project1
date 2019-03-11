import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteemitCalculatorComponent } from './steemit-calculator.component';

describe('SteemitCalculatorComponent', () => {
  let component: SteemitCalculatorComponent;
  let fixture: ComponentFixture<SteemitCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteemitCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteemitCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
