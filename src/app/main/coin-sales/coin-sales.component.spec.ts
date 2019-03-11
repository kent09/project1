import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinSalesComponent } from './coin-sales.component';

describe('CoinSalesComponent', () => {
  let component: CoinSalesComponent;
  let fixture: ComponentFixture<CoinSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
