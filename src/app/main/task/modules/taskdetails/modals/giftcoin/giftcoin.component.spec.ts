import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftcoinComponent } from './giftcoin.component';

describe('GiftcoinComponent', () => {
  let component: GiftcoinComponent;
  let fixture: ComponentFixture<GiftcoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftcoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftcoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
