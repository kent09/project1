import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCoinComponent } from './gift-coin.component';

describe('GiftCoinComponent', () => {
  let component: GiftCoinComponent;
  let fixture: ComponentFixture<GiftCoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftCoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
