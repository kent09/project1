import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinWithdrawalComponent } from './coin-withdrawal.component';

describe('CoinWithdrawalComponent', () => {
  let component: CoinWithdrawalComponent;
  let fixture: ComponentFixture<CoinWithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinWithdrawalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
