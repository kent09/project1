import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinLedgerComponent } from './coin-ledger.component';

describe('CoinLedgerComponent', () => {
  let component: CoinLedgerComponent;
  let fixture: ComponentFixture<CoinLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
