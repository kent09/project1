import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionTradeComponent } from './option-trade.component';

describe('OptionTradeComponent', () => {
  let component: OptionTradeComponent;
  let fixture: ComponentFixture<OptionTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
